<template>
  <div ref="container" class="three-scene"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

const p = [151,160,137,91,149,16,161,190,137,178,160,93,24,147,236,95,147,208,255,165,80,112,18,2,242,10,137,164,191,152,14,147,142,43,172,216,170,178,81,173,150,150,111,102,96,252,128,182,76,254,167,11,172,130,22,236,172,74,213,25,12,137,90,121,161,230,107,43,92,106,66,110,95,120,70,147,219,8,135,142,27,24,99,237,192,207,173,191,114,248,154,77,203,195,14,194,76,175,191,115,108,62,203,63,60,150,147,159,18,230,230,215,229,191,185,155,20,248,126,143,150,8,255,255,89,173,200,68,141,177,150,210,173,184,142,209,147,151,177,12,230,190,150,207,81,161,255,255,255,190,218,172,168,164,151,154,142,91,95,207,165,155,170,75,76,80,10,147,236,255,147,194,208,255,165,80,112,18,2,242,10,137,164,191,152,14,147,142,43,172,216,170,178,81,173,150,150,111,102,96,252,128,182,76,254,167,11,172,130,22,236,172,74,213,25,12,137,90,121,161,230,107,43,92,106,66,110,95,120,70,147,219,8,135,142,27,24,99,237,192,207,173,191,114,248,154,77,203,195,14,194,76,175,191,115,108,62,203,63,60,150,147,159,18,230,230,215,229,191,185,155,20,248,126,143,150,8,255,255,89,173,200,68,141,177,150,210,173,184,142,209,147,151,177,12,230,190,150,207,81,161,255,255,255];
const grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
const perm = new Uint8Array(512);
const gradP = new Uint8Array(512);
(function(p){ for(let i=0; i<256; i++) { perm[i] = perm[i+256] = p[i]; gradP[i] = gradP[i+256] = p[i] % 12; } })(p);
function noise(x, y, z) { let n0, n1, n2, n3; const F3 = 1.0/3.0; const s = (x+y+z)*F3; const i = Math.floor(x+s), j = Math.floor(y+s), k = Math.floor(z+s); const G3 = 1.0/6.0; const t = (i+j+k)*G3; const X0 = i-t; const Y0 = j-t; const Z0 = k-t; const x0 = x-X0; const y0 = y-Y0; const z0 = z-Z0; let i1, j1, k1; let i2, j2, k2; if(x0>=y0) { if(y0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; } else if(x0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; } else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; } } else { if(y0<z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; } else if(x0<z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; } else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; } } const x1 = x0 - i1 + G3; const y1 = y0 - j1 + G3; const z1 = z0 - k1 + G3; const x2 = x0 - i2 + 2.0*G3; const y2 = y0 - j2 + 2.0*G3; const z2 = z0 - k2 + 2.0*G3; const x3 = x0 - 1.0 + 3.0*G3; const y3 = y0 - 1.0 + 3.0*G3; const z3 = z0 - 1.0 + 3.0*G3; const ii = i & 255; const jj = j & 255; const kk = k & 255; let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0; if(t0<0) n0 = 0.0; else { t0 *= t0; n0 = t0 * t0 * dot(gradP[ii+perm[jj+perm[kk]]], x0, y0, z0); } let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1; if(t1<0) n1 = 0.0; else { t1 *= t1; n1 = t1 * t1 * dot(gradP[ii+i1+perm[jj+j1+perm[kk+k1]]], x1, y1, z1); } let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2; if(t2<0) n2 = 0.0; else { t2 *= t2; n2 = t2 * t2 * dot(gradP[ii+i2+perm[jj+j2+perm[kk+k2]]], x2, y2, z2); } let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3; if(t3<0) n3 = 0.0; else { t3 *= t3; n3 = t3 * t3 * dot(gradP[ii+1+perm[jj+1+perm[kk+1]]], x3, y3, z3); } return 32.0*(n0 + n1 + n2 + n3); }
function dot(g, x, y, z) { return grad3[g][0]*x + grad3[g][1]*y + grad3[g][2]*z; }
function lerp(t, a, b) { return a + t * (b - a); }
function scale(n) { return (1 + n) / 2; }

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

let kineticMesh = null;
let solutionsMesh = null;

export default {
  name: 'ThreeDScene',
  data() {
    return {
      time: 0,
      frameCounter: 0
    };
  },
  props: {
    spherePosition: {
      type: Object,
      required: false
    },
    text: {
      type: Object,
      required: false
    }
  },
  watch: {
    spherePosition: {
      handler() {
        this.animateSphere(this.spherePosition.x, this.spherePosition.y, this.spherePosition.z, this.spherePosition.scale);
      },
      deep: true
    },
    text: {
      handler() {
        if (this.text?.refresh) {
          this.repeatTextAnimation();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initThree();
      window.addEventListener('resize', this.onWindowResize, false);
      window.addEventListener('mousemove', this.onMouseMove, false);
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onWindowResize, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
      renderer.dispose();
      this.$refs.container.removeChild(renderer.domElement);
      renderer = null;
    }
    if (scene) {
      scene.traverse((object) => {
        if (object.isMesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      scene.clear();
      scene = null;
    }
    if (controls) {
      controls.dispose();
      controls = null;
    }
    deformableSphere = null;
    camera = null;
    originalPositions = [];
    originalNormals = [];
    currentVertexPositions = [];
  },
  methods: {
    initThree() {
      scene = new THREE.Scene();
      scene.background = null;

      this.setupSceneBackground();

      camera = new THREE.PerspectiveCamera(
        60,
        this.$refs.container.clientWidth / this.$refs.container.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const container = this.$refs.container;
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.shadowMap.enabled = true;
      this.$refs.container.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;
      
      mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      this.setupLights();

      document.fonts.ready.then(() => {
        this.insertFonts();
        this.animateTextToFinalPosition();
      })

      this.createSceneObjects();
      this.animateSphere(0, -1, 1, 1);
      
      this.updateSphereResponsiveness();

      this.animate();
    },
    setupSceneBackground() {
      const container = this.$refs.container;
      const planeGeometry = new THREE.PlaneGeometry(container.clientWidth, 120);
      const gradientMaterial = new THREE.ShaderMaterial({
          uniforms: {
              color1: { value: new THREE.Color(0xC7D9E6) },
              color2: { value: new THREE.Color(0xFFFFFF) }
          },
          vertexShader: `
              varying vec2 vUv;
              void main() {
                  vUv = uv;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
          `,
          fragmentShader: `
              uniform vec3 color1;
              uniform vec3 color2;
              varying vec2 vUv;
              void main() {
                  gl_FragColor = vec4(mix(color2, color1, vUv.y), 1.0);
              }
          `,
          depthWrite: false,
          depthTest: false
      });

      const gradientPlane = new THREE.Mesh(planeGeometry, gradientMaterial);
      gradientPlane.position.z = -50;
      scene.add(gradientPlane);
    },
    setupLights() {
      const ambientLight = new THREE.AmbientLight(0x4040ff, 1);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
      keyLight.position.set(-5, 5, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x00ffff, 0.7);
      fillLight.position.set(5, -5, 2);
      scene.add(fillLight);
    },
    updateSphereResponsiveness() {
      if (!deformableSphere) return; 

      const screenWidth = window.innerWidth;

      if (screenWidth < 768) {
        deformableSphere.visible = false;
      } else {
        deformableSphere.visible = true;
        
        let scale = Math.max(0.55, Math.min(1.0, screenWidth / 1400));
        deformableSphere.scale.set(scale, scale, scale);
      }
    },
    onWindowResize() {
      if (camera && renderer && this.$refs.container) {
        const container = this.$refs.container;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);
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
      this.frameCounter++;

      if (this.frameCounter % 2 === 0) {
        if (deformableSphere) {
          deformableSphere.geometry.computeVertexNormals();
        }
      }

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
          
          positions[i3] = lerp(lerpFactor, currentX, targetX);
          positions[i3 + 1] = lerp(lerpFactor, currentY, targetY);
          positions[i3 + 2] = lerp(lerpFactor, currentZ, targetZ);

          currentVertexPositions[i3] = positions[i3];
          currentVertexPositions[i3 + 1] = positions[i3 + 1];
          currentVertexPositions[i3 + 2] = positions[i3 + 2];
        }

        deformableSphere.geometry.attributes.position.needsUpdate = true;
      }

      if (scene && camera && renderer) {
        renderer.render(scene, camera);
      }
    },
    createSceneObjects() {
      const sphereGeometry = new THREE.SphereGeometry(1.1, 128, 128);
      originalPositions = Array.from(sphereGeometry.attributes.position.array);
      originalNormals = Array.from(sphereGeometry.attributes.normal.array);
      currentVertexPositions = Array.from(sphereGeometry.attributes.position.array);

      const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        roughness: 0.4,
        metalness: 0.1,
        emissive: 0x00008b,
        emissiveIntensity: 1.5
      });
      
      deformableSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      deformableSphere.position.y = -20;
      deformableSphere.position.z = 0;
      scene.add(deformableSphere);
    },
    createText2DTexture(text, options = {}) {
      const {
        font = 'Bold 800px "Ethnocentric"',
        textColor = '#E3EBF1',
        backgroundColor = 'rgba(0,0,0,0)',
        padding = 40
      } = options;

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;

      context.font = font;
      const metrics = context.measureText(text);
      const textWidth = metrics.width;
      const textHeight = parseInt(font.match(/\d+/) * 1.2);

      canvas.width = (textWidth + padding * 2) * dpr;
      canvas.height = (textHeight + padding * 2) * dpr;

      context.scale(dpr, dpr);

      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      context.font = font;
      context.fillStyle = textColor;
      context.textAlign = 'left';
      context.textBaseline = 'top';
      context.fillText(text, padding, padding);

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.needsUpdate = true;

      return texture;
    },
    insertFonts: function () {
      const kineticTexture = this.createText2DTexture('KINETIC', {
          font: 'Bold 2000px "Ethnocentric"',
          textColor: '#E3EBF1'
      });

      const solutionsTexture = this.createText2DTexture('SOLUTIONS', {
          font: 'Bold 2000px "Ethnocentric"',
          textColor: '#E3EBF1'
      });

      const kineticAspectRatio = kineticTexture.image.width / kineticTexture.image.height;
      const solutionsAspectRatio = solutionsTexture.image.width / solutionsTexture.image.height;

      const textHeightInScene = 3;

      const kineticPlaneGeometry = new THREE.PlaneGeometry(textHeightInScene * kineticAspectRatio, textHeightInScene);
      const solutionsPlaneGeometry = new THREE.PlaneGeometry(textHeightInScene * solutionsAspectRatio, textHeightInScene);

      const kineticMaterial = new THREE.MeshBasicMaterial({
          map: kineticTexture,
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 0.4
      });

      const solutionsMaterial = new THREE.MeshBasicMaterial({
          map: solutionsTexture,
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 0.4
      });

      kineticMesh = new THREE.Mesh(kineticPlaneGeometry, kineticMaterial);
      solutionsMesh = new THREE.Mesh(solutionsPlaneGeometry, solutionsMaterial);

      kineticMesh.position.set(-20, 0.7, -1);
      solutionsMesh.position.set(80, -2, -1); 

      scene.add(kineticMesh);
      scene.add(solutionsMesh);
    },
    animateTextToFinalPosition() {
        if (kineticMesh && solutionsMesh) {
            gsap.to(kineticMesh.position, {
                x: -5,
                y: 0.7,
                z: -1,
                duration: 2,
                ease: "power2.out"
            });

            gsap.to(solutionsMesh.position, {
                x: 7,
                y: -2,
                z: -1,
                duration: 2,
                ease: "power2.out"
            });
        }
    },
    repeatTextAnimation: function () {
      if (kineticMesh && solutionsMesh) {
        gsap.to(kineticMesh.position, {
            x: -20,
            y: 0.7,
            z: -1,
            duration: 2,
            ease: "power2.out"
        });

        gsap.to(solutionsMesh.position, {
            x: 20,
            y: -2,
            z: -1,
            duration: 2,
            ease: "power2.out"
        });

        setTimeout(() => {
          this.animateTextToFinalPosition();
        }, 700)
      }
    },
    animateSphere: function (x, y, z, scale) {
      gsap.to(deformableSphere.position, {
          x: x,
          y: y,
          z: z,
          duration: 2.2,
          ease: "power2.inOut"
      });
      
      gsap.to(deformableSphere.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 2.2,
          ease: "power2.inOut"
      });
    }
  },
};
</script>

<style scoped>
.three-scene {
  position: fixed;
  touch-action: none;
  top: 1.2rem;
  left: 1.2rem;
  right: 1.2rem;
  bottom: 1.2rem;
  border-radius: 2rem;
  overflow: hidden;
}

.three-scene canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
  border-radius: 2rem;
  overflow: hidden;
}
</style>