<template>
  <div ref="container" class="three-scene"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// --- Funções de Simplex Noise (Corrigido) ---
const p = [151,160,137,91,149,16,161,190,137,178,160,93,24,147,236,95,147,208,255,165,80,112,18,2,242,10,137,164,191,152,14,147,142,43,172,216,170,178,81,173,150,150,111,102,96,252,128,182,76,254,167,11,172,130,22,236,172,74,213,25,12,137,90,121,161,230,107,43,92,106,66,110,95,120,70,147,219,8,135,142,27,24,99,237,192,207,173,191,114,248,154,77,203,195,14,194,76,175,191,115,108,62,203,63,60,150,147,159,18,230,230,215,229,191,185,155,20,248,126,143,150,8,255,255,89,173,200,68,141,177,150,210,173,184,142,209,147,151,177,12,230,190,150,207,81,161,255,255,255,190,218,172,168,164,151,154,142,91,95,207,165,155,170,75,76,80,10,147,236,255,147,194,208,255,165,80,112,18,2,242,10,137,164,191,152,14,147,142,43,172,216,170,178,81,173,150,150,111,102,96,252,128,182,76,254,167,11,172,130,22,236,172,74,213,25,12,137,90,121,161,230,107,43,92,106,66,110,95,120,70,147,219,8,135,142,27,24,99,237,192,207,173,191,114,248,154,77,203,195,14,194,76,175,191,115,108,62,203,63,60,150,147,159,18,230,230,215,229,191,185,155,20,248,126,143,150,8,255,255,89,173,200,68,141,177,150,210,173,184,142,209,147,151,177,12,230,190,150,207,81,161,255,255,255];

const grad3 = [
    [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
    [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
    [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
];

const perm = new Uint8Array(512);
const gradP = new Uint8Array(512);

(function(p){
  for(let i=0; i<256; i++) {
    perm[i] = perm[i+256] = p[i];
    gradP[i] = gradP[i+256] = p[i] % 12;
  }
})(p);

function noise(x, y, z) {
  let n0, n1, n2, n3; 
  const F3 = 1.0/3.0;
  const s = (x+y+z)*F3;
  const i = Math.floor(x+s), j = Math.floor(y+s), k = Math.floor(z+s);
  const G3 = 1.0/6.0;
  const t = (i+j+k)*G3;
  const X0 = i-t; 
  const Y0 = j-t;
  const Z0 = k-t;
  const x0 = x-X0; 
  const y0 = y-Y0;
  const z0 = z-Z0;
  let i1, j1, k1; 
  let i2, j2, k2; 
  if(x0>=y0) {
    if(y0>=z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; } 
    else if(x0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; } 
    else            { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; } 
  } else { 
    if(y0<z0)       { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; } 
    else if(x0<z0)  { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; } 
    else            { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; } 
  }
  const x1 = x0 - i1 + G3; 
  const y1 = y0 - j1 + G3;
  const z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2.0*G3; 
  const y2 = y0 - j2 + 2.0*G3;
  const z2 = z0 - k2 + 2.0*G3;
  const x3 = x0 - 1.0 + 3.0*G3; 
  const y3 = y0 - 1.0 + 3.0*G3;
  const z3 = z0 - 1.0 + 3.0*G3;
  const ii = i & 255;
  const jj = j & 255;
  const kk = k & 255;
  let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
  if(t0<0) n0 = 0.0;
  else {
    t0 *= t0;
    n0 = t0 * t0 * dot(gradP[ii+perm[jj+perm[kk]]], x0, y0, z0);
  }
  let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
  if(t1<0) n1 = 0.0;
  else {
    t1 *= t1;
    n1 = t1 * t1 * dot(gradP[ii+i1+perm[jj+j1+perm[kk+k1]]], x1, y1, z1);
  }
  let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
  if(t2<0) n2 = 0.0;
  else {
    t2 *= t2;
    n2 = t2 * t2 * dot(gradP[ii+i2+perm[jj+j2+perm[kk+k2]]], x2, y2, z2);
  }
  let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
  if(t3<0) n3 = 0.0;
  else {
    t3 *= t3;
    n3 = t3 * t3 * dot(gradP[ii+1+perm[jj+1+perm[kk+1]]], x3, y3, z3);
  }
  return 32.0*(n0 + n1 + n2 + n3);
}
function dot(g, x, y, z) { return grad3[g][0]*x + grad3[g][1]*y + grad3[g][2]*z; }
function lerp(t, a, b) { return a + t * (b - a); }
function scale(n) { return (1 + n) / 2; }

// --- Fim das Funções de Simplex Noise ---

let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let deformableSphere = null;
let animationFrameId = null;
let mouse = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let mousePlane = null;
let mouseTarget = new THREE.Vector3();

let originalPositions = [];
let originalNormals = [];
let currentVertexPositions = [];
let environmentMap = null;
let energyTexture = null;

export default {
  name: 'ThreeDScene',
  data() {
    return {
      time: 0,
    };
  },
  mounted() {
    this.initThree();
    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
      renderer.dispose();
      renderer = null;
    }
    if (scene) {
      scene.clear();
      scene = null;
    }
    if (controls) {
      controls.dispose();
      controls = null;
    }
    if (energyTexture) {
      energyTexture.dispose();
      energyTexture = null;
    }
    deformableSphere = null;
    camera = null;
    originalPositions = [];
    originalNormals = [];
    currentVertexPositions = [];
    environmentMap = null;
  },
  methods: {
    initThree() {
      // 1. CENA
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xF8F8F8);
      scene.fog = new THREE.Fog(0xF8F8F8, 5, 20);

      // 2. CÂMERA
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 5);

      // 3. RENDERIZADOR
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      this.$refs.container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;

      // Criar plano de interseção para o mouse na profundidade da esfera
      mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      // Criar o Environment Map e a Textura
      this.createEnvironmentMap();
      energyTexture = this.createEnergyTexture();

      // 4. LUZES
      const ambientLight = new THREE.AmbientLight(0x4040ff, 1);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
      keyLight.position.set(-5, 5, 5);
      scene.add(keyLight);
      
      const fillLight = new THREE.DirectionalLight(0x00ffff, 0.7);
      fillLight.position.set(5, -5, 2);
      scene.add(fillLight);


      // 5. OBJETOS
      this.createSceneObjects();
      
      // Chamar a função de responsividade na inicialização
      this.updateSphereResponsiveness();

      // 6. ANIMAÇÃO
      this.animate();
    },
    updateSphereResponsiveness() {
        if (!deformableSphere) return; // Garante que a esfera já foi criada

        const screenWidth = window.innerWidth;

        if (screenWidth < 768) {
            deformableSphere.visible = false;
        } else {
            deformableSphere.visible = true;
            
            // Ajusta a escala da esfera de forma sutil
            const scale = Math.max(0.55, Math.min(1.0, screenWidth / 1400));
            deformableSphere.scale.set(scale, scale, scale);
        }
    },
    // CORREÇÃO: Lógica de geração de textura para evitar distorção nos pólos
    createEnergyTexture() {
        const size = 256;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
        const imageData = context.getImageData(0, 0, size, size);
        const data = imageData.data;
        const noiseScale = 3.0; // Ajuste para "zoom" do ruído

        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                // Converte coordenadas do pixel 2D para um ponto 3D numa esfera (mapeamento esférico)
                const u = x / size;
                const v = y / size;

                // Mapeia u,v para coordenadas esféricas (longitude, latitude)
                const theta = u * 2 * Math.PI;
                const phi = v * Math.PI;

                // Converte de esférico para cartesiano 3D
                const px = Math.sin(phi) * Math.cos(theta);
                const py = Math.cos(phi);
                const pz = Math.sin(phi) * Math.sin(theta);
                
                // Usa a posição 3D para obter o valor do ruído, criando um padrão contínuo
                const n = noise(
                    px * noiseScale + this.time,
                    py * noiseScale + this.time,
                    pz * noiseScale + this.time
                );

                const brightness = Math.max(0, Math.min(255, scale(n) * 255));
                const index = (x + y * size) * 4;
                data[index] = brightness * 0.8;
                data[index + 1] = brightness * 0.9;
                data[index + 2] = 255;
                data[index + 3] = 255;
            }
        }
        context.putImageData(imageData, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    },
    createEnvironmentMap() {
      const cubeTexture = new THREE.CubeTexture( [
        new THREE.Color(0x101030),
        new THREE.Color(0x101030),
        new THREE.Color(0x303050),
        new THREE.Color(0x050510),
        new THREE.Color(0x101030),
        new THREE.Color(0x101030)
      ].map(color => {
          const size = 1;
          const canvas = document.createElement('canvas');
          canvas.width = size; canvas.height = size;
          const context = canvas.getContext('2d');
          context.fillStyle = color.getStyle();
          context.fillRect(0, 0, size, size);
          return canvas;
      }) );
      cubeTexture.needsUpdate = true;
      environmentMap = cubeTexture;
      scene.environment = environmentMap;
    },
    onWindowResize() {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        
        this.updateSphereResponsiveness();
      }
    },
    onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },
    animate() {
      animationFrameId = requestAnimationFrame(this.animate);
      this.time += 0.005;

      if (deformableSphere && mousePlane) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(mousePlane, mouseTarget);
        
        const pointOfInfluence = mouseTarget;

        deformableSphere.rotation.y += 0.001;
        deformableSphere.rotation.x += 0.0005;

        const positions = deformableSphere.geometry.attributes.position.array;
        const vertexCount = originalPositions.length / 3;
        const noiseScale = 0.8;
        const noiseStrength = 0.15;

        const mouseDeformStrength = 0.8;
        const mouseDeformRadius = 2.5;
        const lerpFactor = 0.08;

        for (let i = 0; i < vertexCount; i++) {
          const i3 = i * 3;
          const originalX = originalPositions[i3];
          const originalY = originalPositions[i3 + 1];
          const originalZ = originalPositions[i3 + 2];

          const currentX = currentVertexPositions[i3];
          const currentY = currentVertexPositions[i3 + 1];
          const currentZ = currentVertexPositions[i3 + 2];
          
          const nX = originalX * noiseScale + this.time;
          const nY = originalY * noiseScale + this.time;
          const nZ = originalZ * noiseScale + this.time;
          const noiseValue = noise(nX, nY, nZ);

          const originalNormal = new THREE.Vector3(originalNormals[i3], originalNormals[i3+1], originalNormals[i3+2]);
          let targetX = originalX + originalNormal.x * noiseValue * noiseStrength;
          let targetY = originalY + originalNormal.y * noiseValue * noiseStrength;
          let targetZ = originalZ + originalNormal.z * noiseValue * noiseStrength;

          const vertexWorldPos = new THREE.Vector3(originalX, originalY, originalZ);
          vertexWorldPos.applyMatrix4(deformableSphere.matrixWorld);

          const distance = vertexWorldPos.distanceTo(pointOfInfluence);
          
          if (distance < mouseDeformRadius) {
            const strength = (1 - (distance / mouseDeformRadius));
            const inwardDirection = new THREE.Vector3().subVectors(deformableSphere.position, vertexWorldPos).normalize();
            
            targetX += inwardDirection.x * strength * mouseDeformStrength;
            targetY += inwardDirection.y * strength * mouseDeformStrength;
            targetZ += inwardDirection.z * strength * mouseDeformStrength;
          }

          positions[i3]     = lerp(lerpFactor, currentX, targetX);
          positions[i3 + 1] = lerp(lerpFactor, currentY, targetY);
          positions[i3 + 2] = lerp(lerpFactor, currentZ, targetZ);

          currentVertexPositions[i3]     = positions[i3];
          currentVertexPositions[i3 + 1] = positions[i3 + 1];
          currentVertexPositions[i3 + 2] = positions[i3 + 2];
        }

        deformableSphere.geometry.attributes.position.needsUpdate = true;
        deformableSphere.geometry.computeVertexNormals();
      }

      if (scene && camera && renderer) {
        renderer.render(scene, camera);
      }
    },
    createSceneObjects() {
      const sphereGeometry = new THREE.SphereGeometry(1.5, 128, 128);
      
      originalPositions = Array.from(sphereGeometry.attributes.position.array);
      originalNormals = Array.from(sphereGeometry.attributes.normal.array);
      currentVertexPositions = Array.from(sphereGeometry.attributes.position.array);

      const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 0.4,
        metalness: 0,
        envMap: environmentMap,
        envMapIntensity: 1.0,
        emissive: 0x00008b,
        emissiveMap: energyTexture,
        emissiveIntensity: 1.2,
      });

      deformableSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(deformableSphere);

      const planeGeometry = new THREE.PlaneGeometry(60, 60); 
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xF8F8F8, 
        roughness: 0, 
        metalness: 0,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = -2;
      plane.receiveShadow = false; 
      scene.add(plane);
    },
  },
};
</script>

<style scoped>
.three-scene {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  background-color: #050810;
}
</style>