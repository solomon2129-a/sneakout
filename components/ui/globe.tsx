"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface GlobeConfig {
  pointSize: number;
  globeColor: string;
  showAtmosphere: boolean;
  atmosphereColor: string;
  atmosphereAltitude: number;
  emissive: string;
  emissiveIntensity: number;
  shininess: number;
  polygonColor: string;
  ambientLight: string;
  directionalLeftLight: string;
  directionalTopLight: string;
  pointLight: string;
  arcTime: number;
  arcLength: number;
  rings: number;
  maxRings: number;
  initialPosition: { lat: number; lng: number };
  autoRotate: boolean;
  autoRotateSpeed: number;
}

interface ArcData {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

export const World = ({
  globeConfig,
  data = [],
}: {
  globeConfig: GlobeConfig;
  data?: ArcData[];
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvasRef.current,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;

    // Create globe
    const geometry = new THREE.IcosahedronGeometry(1, 64);
    const material = new THREE.MeshPhongMaterial({
      emissive: parseInt(globeConfig.emissive.replace("#", ""), 16),
      emissiveIntensity: globeConfig.emissiveIntensity,
      shininess: globeConfig.shininess,
      flatShading: true,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    globeRef.current = globe;

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      parseInt(globeConfig.ambientLight.replace("#", ""), 16),
      0.5
    );
    scene.add(ambientLight);

    const directionalLeft = new THREE.DirectionalLight(
      globeConfig.directionalLeftLight,
      0.8
    );
    directionalLeft.position.set(-5, 3, 5);
    scene.add(directionalLeft);

    const directionalTop = new THREE.DirectionalLight(
      globeConfig.directionalTopLight,
      0.3
    );
    directionalTop.position.set(0, 5, 0);
    scene.add(directionalTop);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (globeRef.current) {
        if (globeConfig.autoRotate) {
          globeRef.current.rotation.y += globeConfig.autoRotateSpeed * 0.002;
        }
        globeRef.current.rotation.x += 0.0001;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [globeConfig]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
