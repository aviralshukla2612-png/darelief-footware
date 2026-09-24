"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ShoeCanvas3D({
  color = "#701A2B", // default Maroon
  autoRotate = true,
  interactive = true,
  showControls = true,
  height = "460px"
}) {
  const containerRef = useRef(null);
  const shoeMeshGroupRef = useRef(null);
  const upperMaterialRef = useRef(null);
  const strapMaterialRef = useRef(null);
  const soleMaterialRef = useRef(null);
  const insoleMaterialRef = useRef(null);
  const [userSelectedColor, setUserSelectedColor] = useState(null);
  const [isRotating, setIsRotating] = useState(autoRotate);

  const activeColor = userSelectedColor || color;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const width = container.clientWidth || 400;
    const heightPx = container.clientHeight || 460;
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(3.5, 2.2, 4.2);
    camera.lookAt(0, 0.3, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf8ead6, 1.2);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    const rimLight = new THREE.SpotLight(0xc5a059, 2.5);
    rimLight.position.set(0, 5, -5);
    rimLight.lookAt(0, 0, 0);
    scene.add(rimLight);

    // Floor Shadow Receiver
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.65;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Build Procedural Sculptural Strappy Sandal / Heeled Footwear Model
    const shoeGroup = new THREE.Group();
    shoeMeshGroupRef.current = shoeGroup;

    // Materials
    const hexColor = new THREE.Color(activeColor);
    const upperMat = new THREE.MeshStandardMaterial({
      color: hexColor,
      roughness: 0.35,
      metalness: 0.12
    });
    upperMaterialRef.current = upperMat;

    const strapMat = new THREE.MeshStandardMaterial({
      color: hexColor,
      roughness: 0.3,
      metalness: 0.15
    });
    strapMaterialRef.current = strapMat;

    const insoleMat = new THREE.MeshStandardMaterial({
      color: 0xefdec6,
      roughness: 0.6,
      metalness: 0.05
    });
    insoleMaterialRef.current = insoleMat;

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.85
    });

    const soleMat = new THREE.MeshStandardMaterial({
      color: 0x221e1d,
      roughness: 0.7,
      metalness: 0.05
    });
    soleMaterialRef.current = soleMat;

    // 1. Insole / Footbed Sculpted Base
    const footbedShape = new THREE.Shape();
    footbedShape.moveTo(-1.5, 0);
    footbedShape.bezierCurveTo(-1.5, 0.45, -0.6, 0.55, 0, 0.5);
    footbedShape.bezierCurveTo(0.8, 0.45, 1.4, 0.35, 1.5, 0);
    footbedShape.bezierCurveTo(1.4, -0.35, 0.8, -0.45, 0, -0.5);
    footbedShape.bezierCurveTo(-0.6, -0.55, -1.5, -0.45, -1.5, 0);

    const footbedExtrudeSettings = {
      steps: 16,
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.04,
      bevelSegments: 4
    };

    const footbedGeo = new THREE.ExtrudeGeometry(footbedShape, footbedExtrudeSettings);
    footbedGeo.rotateX(Math.PI / 2);
    footbedGeo.rotateZ(0.15); // gentle pitch slope

    const footbedMesh = new THREE.Mesh(footbedGeo, insoleMat);
    footbedMesh.castShadow = true;
    footbedMesh.receiveShadow = true;
    footbedMesh.position.set(0, -0.1, 0);
    shoeGroup.add(footbedMesh);

    // Sole Underbed
    const soleMesh = new THREE.Mesh(footbedGeo, soleMat);
    soleMesh.position.set(0, -0.16, 0);
    soleMesh.scale.set(1.02, 1.02, 1.02);
    shoeGroup.add(soleMesh);

    // 2. Block Architectural Heel
    const heelShape = new THREE.Shape();
    heelShape.moveTo(-0.3, -0.25);
    heelShape.lineTo(0.3, -0.25);
    heelShape.lineTo(0.25, 0.25);
    heelShape.lineTo(-0.25, 0.25);
    heelShape.closePath();

    const heelExtrudeSettings = {
      depth: 0.9,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3
    };
    const heelGeo = new THREE.ExtrudeGeometry(heelShape, heelExtrudeSettings);
    heelGeo.rotateX(Math.PI / 2);
    const heelMesh = new THREE.Mesh(heelGeo, upperMat);
    heelMesh.position.set(1.15, -0.18, 0);
    heelMesh.castShadow = true;
    shoeGroup.add(heelMesh);

    // Heel tip rubber
    const heelTipGeo = new THREE.CylinderGeometry(0.26, 0.28, 0.06, 16);
    const heelTip = new THREE.Mesh(heelTipGeo, soleMat);
    heelTip.position.set(1.15, -0.63, 0);
    shoeGroup.add(heelTip);

    // 3. Front Toe Straps (Elegant Crossover Design)
    const strapCurve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.1, -0.1, -0.45),
      new THREE.Vector3(-0.95, 0.22, 0),
      new THREE.Vector3(-0.7, -0.1, 0.45)
    ]);
    const strapGeo1 = new THREE.TubeGeometry(strapCurve1, 24, 0.045, 12, false);
    const strapMesh1 = new THREE.Mesh(strapGeo1, strapMat);
    strapMesh1.castShadow = true;
    shoeGroup.add(strapMesh1);

    const strapCurve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.1, -0.1, 0.45),
      new THREE.Vector3(-0.95, 0.24, 0),
      new THREE.Vector3(-0.7, -0.1, -0.45)
    ]);
    const strapGeo2 = new THREE.TubeGeometry(strapCurve2, 24, 0.045, 12, false);
    const strapMesh2 = new THREE.Mesh(strapGeo2, strapMat);
    strapMesh2.castShadow = true;
    shoeGroup.add(strapMesh2);

    // 4. Instep Diagonal Straps
    const instepCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.4, -0.05, -0.48),
      new THREE.Vector3(-0.15, 0.38, -0.1),
      new THREE.Vector3(0.25, 0.1, 0.48)
    ]);
    const instepGeo = new THREE.TubeGeometry(instepCurve, 24, 0.042, 12, false);
    const instepMesh = new THREE.Mesh(instepGeo, strapMat);
    instepMesh.castShadow = true;
    shoeGroup.add(instepMesh);

    // 5. Ankle Wrap & Buckle Strap
    const ankleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.8, 0.05, -0.45),
      new THREE.Vector3(0.9, 0.65, -0.35),
      new THREE.Vector3(1.1, 0.75, 0),
      new THREE.Vector3(0.9, 0.65, 0.35),
      new THREE.Vector3(0.8, 0.05, 0.45)
    ]);
    const ankleGeo = new THREE.TubeGeometry(ankleCurve, 32, 0.038, 12, false);
    const ankleMesh = new THREE.Mesh(ankleGeo, strapMat);
    ankleMesh.castShadow = true;
    shoeGroup.add(ankleMesh);

    // Gold Buckle accent
    const buckleGeo = new THREE.TorusGeometry(0.065, 0.016, 8, 16);
    const buckleMesh = new THREE.Mesh(buckleGeo, goldMat);
    buckleMesh.position.set(0.92, 0.68, 0.36);
    buckleMesh.rotation.y = Math.PI / 4;
    shoeGroup.add(buckleMesh);

    // Position shoe nicely in frame
    shoeGroup.position.set(0, 0, 0);
    shoeGroup.rotation.y = -0.5;
    scene.add(shoeGroup);

    // Mouse / Touch Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      if (!interactive) return;
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging || !shoeGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      shoeGroup.rotation.y += deltaX * 0.008;
      shoeGroup.rotation.x = Math.max(-0.4, Math.min(0.4, shoeGroup.rotation.x + deltaY * 0.005));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (isRotating && !isDragging && shoeGroup) {
        shoeGroup.rotation.y += delta * 0.5;
      }

      // Gentle floating levitation effect
      if (shoeGroup) {
        shoeGroup.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.03;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, [interactive]);

  // Update material color dynamically when activeColor changes
  useEffect(() => {
    if (upperMaterialRef.current && strapMaterialRef.current) {
      const newCol = new THREE.Color(activeColor);
      upperMaterialRef.current.color = newCol;
      strapMaterialRef.current.color = newCol;
    }
  }, [activeColor]);

  const colorPalette = [
    { label: "Maroon", hex: "#701A2B" },
    { label: "Beige", hex: "#EFE8DA" },
    { label: "Black", hex: "#181615" },
    { label: "Tan", hex: "#C5A059" }
  ];

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#FAF7F2] to-[#EFE8DA]/40 border border-[#E5DED4] shadow-sm flex flex-col justify-between"
      style={{ minHeight: height }}
    >
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" style={{ minHeight: height }} />

      {/* Floating 3D Badge */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5DED4] shadow-sm text-xs font-medium text-[#181615]">
        <span className="w-2 h-2 rounded-full bg-[#701A2B]" />
        <span>3D Studio Interactive</span>
      </div>

      {/* Controls / Color Switcher */}
      {showControls && (
        <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#E5DED4] shadow-md">
          {/* Color Switchers */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#77716A] uppercase tracking-wider pl-1">Finish:</span>
            {colorPalette.map((c) => (
              <button
                key={c.hex}
                onClick={() => setUserSelectedColor(c.hex)}
                className={`w-6 h-6 rounded-full border-2 transition-all transform hover:scale-110 ${
                  activeColor.toLowerCase() === c.hex.toLowerCase()
                    ? "border-[#701A2B] scale-110 shadow-md ring-2 ring-[#701A2B]/20"
                    : "border-white/80 opacity-80"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.label}
              />
            ))}
          </div>

          {/* Spin / Pause Toggle & 360 hint */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#77716A] hidden sm:inline-block">Drag to rotate 360°</span>
            <button
              onClick={() => setIsRotating(!isRotating)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#FAF7F2] border border-[#E5DED4] text-[#181615] hover:bg-[#EFE8DA] transition-colors"
            >
              {isRotating ? "Pause Spin" : "Auto Spin"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
