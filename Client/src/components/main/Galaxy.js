import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

export default function Galaxy() {
    const canvasRef = useRef(null);
    const [sizes, setSizes] = useState({
        width: window.innerWidth < 1200 
            ? window.innerWidth - 40
            : window.innerWidth * 0.6,
        height: window.innerHeight,
        radius: window.innerWidth < 1200 ? 2 : 3
    });

    useEffect(() => {
        const canvas = canvasRef.current;

        // Scene
        const scene = new THREE.Scene();

        const parameters = {};
        parameters.count = 50000;
        parameters.size = 0.01;
        parameters.branches = 10;
        parameters.spin = 1;
        parameters.randomness = 0.2;
        parameters.randomnessPower = 3;
        parameters.insideColor = "#f74788";
        parameters.outsideColor = "#4c47f7";

        // Geometry
        const geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(parameters.count * 3);
        const colors = new Float32Array(parameters.count * 3);

        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);

        for(let i = 0; i < parameters.count; i++) {
            const i3 = i * 3;

            const radius = Math.random() * sizes.radius;
    
            const spinAngle = radius * parameters.spin;
            const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
            
            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius;
    
            positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3 + 1] = randomY;
            positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    
            // Color
            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, radius / sizes.radius);
            
            colors[i3    ] = mixedColor.r;
            colors[i3 + 1] = mixedColor.g;
            colors[i3 + 2] = mixedColor.b;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        // Material
        const material = new THREE.PointsMaterial({
            size: parameters.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })

        // Points
        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // Base camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(0, 5, 0);
        camera.up.set(0, 0, -1);
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Render
        renderer.render(scene, camera);

        return () => {
            geometry.dispose();
            material.dispose();
            scene.remove(points);
        }
    }, [sizes]);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);
    

    const handleResize = () => {
        setSizes({
            width: window.innerWidth < 1200 
            ? window.innerWidth - 40
            : window.innerWidth * 0.6,
            height: window.innerHeight,
            radius: window.innerWidth < 1200 ? 2 : 2.5
        });
    }

    return (
        <canvas ref={canvasRef}></canvas>
    );
}
