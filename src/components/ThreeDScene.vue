<template>
  <div ref="container" class="three-scene"></div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

// --- Funções de Simplex Noise ---
// Mantidas como estão, pois são utilitárias e funcionais.
const p = [151,160,137,91,149,16,161,190,137,178,160,93,24,147,236,95,147,208,255,165,80,112,18,2,242,10,137,164,191,152,14,147,142,43,172,216,170,178,81,173,150,150,111,102,96,252,128,182,76,254,167,11,172,130,22,236,172,74,213,25,12,137,90,121,161,230,107,43,92,106,66,110,95,120,70,147,219,8,135,142,27,24,99,237,192,207,173,191,114,248,154,77,203,195,14,194,76,175,191,115,108,62,203,63,60,150,147,159,18,230,230,215,229,191,185,155,20,248,126,143,150,8,255,255,89,173,200,68,141,177,150,210,173,184,142,209,147,151,177,12,230,190,150,207,81,161,255,255,255,190,218,172,168,164,151,154,142,91,95,207,165,155,170,75,76,80,10,147,236,255,147,194,208,255,165,80,112,18,2,242,10,137,164,191,152,14,147,142,43,172,216,170,178,81,173,150,150,111,102,96,252,128,182,76,254,167,11,172,130,22,236,172,74,213,25,12,137,90,121,161,230,107,43,92,106,66,110,95,120,70,147,219,8,135,142,27,24,99,237,192,207,173,191,114,248,154,77,203,195,14,194,76,175,191,115,108,62,203,63,60,150,147,159,18,230,230,215,229,191,185,155,20,248,126,143,150,8,255,255,89,173,200,68,141,177,150,210,173,184,142,209,147,151,177,12,230,190,150,207,81,161,255,255,255];
const grad3 = [[1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0], [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1], [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]];
const perm = new Uint8Array(512);
const gradP = new Uint8Array(512);
(function(p){ for(let i=0; i<256; i++) { perm[i] = perm[i+256] = p[i]; gradP[i] = gradP[i+256] = p[i] % 12; } })(p);
function noise(x, y, z) { let n0, n1, n2, n3; const F3 = 1.0/3.0; const s = (x+y+z)*F3; const i = Math.floor(x+s), j = Math.floor(y+s), k = Math.floor(z+s); const G3 = 1.0/6.0; const t = (i+j+k)*G3; const X0 = i-t; const Y0 = j-t; const Z0 = k-t; const x0 = x-X0; const y0 = y-Y0; const z0 = z-Z0; let i1, j1, k1; let i2, j2, k2; if(x0>=y0) { if(y0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; } else if(x0>=z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; } else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; } } else { if(y0<z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; } else if(x0<z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; } else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; } } const x1 = x0 - i1 + G3; const y1 = y0 - j1 + G3; const z1 = z0 - k1 + G3; const x2 = x0 - i2 + 2.0*G3; const y2 = y0 - j2 + 2.0*G3; const z2 = z0 - k2 + 2.0*G3; const x3 = x0 - 1.0 + 3.0*G3; const y3 = y0 - 1.0 + 3.0*G3; const z3 = z0 - 1.0 + 3.0*G3; const ii = i & 255; const jj = j & 255; const kk = k & 255; let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0; if(t0<0) n0 = 0.0; else { t0 *= t0; n0 = t0 * t0 * dot(gradP[ii+perm[jj+perm[kk]]], x0, y0, z0); } let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1; if(t1<0) n1 = 0.0; else { t1 *= t1; n1 = t1 * t1 * dot(gradP[ii+i1+perm[jj+j1+perm[kk+k1]]], x1, y1, z1); } let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2; if(t2<0) n2 = 0.0; else { t2 *= t2; n2 = t2 * t2 * dot(gradP[ii+i2+perm[jj+j2+perm[kk+k2]]], x2, y2, z2); } let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3; if(t3<0) n3 = 0.0; else { t3 *= t3; n3 = t3 * t3 * dot(gradP[ii+1+perm[jj+1+perm[kk+1]]], x3, y3, z3); } return 32.0*(n0 + n1 + n2 + n3); }
function dot(g, x, y, z) { return grad3[g][0]*x + grad3[g][1]*y + grad3[g][2]*z; }
function lerp(t, a, b) { return a + t * (b - a); }
function scale(n) { return (1 + n) / 2; }

// --- Fim das Funções de Simplex Noise ---

// Variáveis globais para a cena Three.js
// É uma boa prática declará-las fora do componente se forem acessadas por vários métodos
// e se elas persistirem o ciclo de vida do componente.
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

// Dados da esfera deformável
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
    // Inicializa a cena Three.js quando o componente é montado no DOM
    this.initThree();
    // Adiciona event listeners para redimensionamento da janela e movimento do mouse
    window.addEventListener('resize', this.onWindowResize, false);
    window.addEventListener('mousemove', this.onMouseMove, false);
  },
  beforeUnmount() {
    // Limpeza de event listeners e recursos Three.js antes que o componente seja destruído
    window.removeEventListener('resize', this.onWindowResize, false);
    window.removeEventListener('mousemove', this.onMouseMove, false);

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (renderer) {
      renderer.dispose(); // Libera a memória da GPU
      this.$refs.container.removeChild(renderer.domElement); // Remove o canvas do DOM
      renderer = null;
    }
    if (scene) {
      scene.traverse((object) => { // Dispose de geometrias e materiais de todos os objetos na cena
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
    // Limpeza de variáveis globais para evitar vazamento de memória
    deformableSphere = null;
    camera = null;
    originalPositions = [];
    originalNormals = [];
    currentVertexPositions = [];
  },
  methods: {
    /**
     * @method initThree
     * @description Inicializa a cena Three.js, câmera, renderer, controles e objetos.
     */
    initThree() {
      // 1. CENA
      scene = new THREE.Scene();
      // A névoa ajuda a "esconder" o fim do fundo e dar profundidade.
      //scene.fog = new THREE.Fog(0xF8F8F8, 5, 20);
      scene.background = null;
      //scene.background = new THREE.Color(0xff0000);

      // Define o gradiente de fundo da cena
      this.setupSceneBackground();

      // 2. CÂMERA
      // Câmera de perspectiva para uma visão 3D realista.
      camera = new THREE.PerspectiveCamera(
        60,
        this.$refs.container.clientWidth / this.$refs.container.clientHeight, // Proporção baseada no container
        0.1,
        1000
      );
      camera.position.set(0, 0, 5); // Posição inicial da câmera

      // 3. RENDERIZADOR
      // Renderer WebGL para renderizar a cena no canvas.
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      // Define o tamanho do renderer para preencher o contêiner.
      const container = this.$refs.container;
      renderer.setSize(container.clientWidth, container.clientHeight);
      // Ajusta o pixel ratio para alta densidade de pixels (telas Retina).
      renderer.setPixelRatio(window.devicePixelRatio);
      // Configurações de tone mapping para melhor aparência das luzes e cores.
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.shadowMap.enabled = true;
      // Anexa o elemento canvas do renderer ao contêiner Vue.
      this.$refs.container.appendChild(renderer.domElement);

      // Controles de órbita (desabilitados para rotação automática)
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false; // Rotação desabilitada para interatividade customizada
      
      // Plano para calcular a interseção do mouse no espaço 3D
      mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      // 4. LUZES
      this.setupLights();

      document.fonts.ready.then(() => {
        this.insertFonts();
        this.animateTextToFinalPosition();
      })

      // 5. OBJETOS DA CENA
      this.createSceneObjects();
      this.animateSphere(0, -1, 1, 1);
      
      // Ajusta a escala da esfera com base na largura da tela
      this.updateSphereResponsiveness();

      // 6. ANIMAÇÃO
      this.animate();
    },

    /**
     * @method setupSceneBackground
     * @description Cria e define uma textura de gradiente para o background da cena.
     * Utiliza um Canvas 2D para gerar o gradiente vertical.
     */
    setupSceneBackground() {
      const container = this.$refs.container;
      const planeGeometry = new THREE.PlaneGeometry(container.clientWidth, 120); // Um plano bem grande
      const gradientMaterial = new THREE.ShaderMaterial({
          uniforms: {
              color1: { value: new THREE.Color(0xC7D9E6) }, // Cor superior
              color2: { value: new THREE.Color(0xFFFFFF) }  // Cor inferior
          },
          vertexShader: `
              varying vec2 vUv;
              void main() {
                  vUv = uv; // uv.y vai de 0 a 1 verticalmente
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
          `,
          fragmentShader: `
              uniform vec3 color1;
              uniform vec3 color2;
              varying vec2 vUv;
              void main() {
                  // Interpolação linear entre color1 e color2 baseada na coordenada Y (vUv.y)
                  gl_FragColor = vec4(mix(color2, color1, vUv.y), 1.0);
              }
          `,
          depthWrite: false, // Garante que não interfira com outros objetos
          depthTest: false
      });

      const gradientPlane = new THREE.Mesh(planeGeometry, gradientMaterial);
      gradientPlane.position.z = -50;
      scene.add(gradientPlane);
    },

    /**
     * @method setupLights
     * @description Configura as luzes na cena para iluminação da esfera.
     */
    setupLights() {
      // Luz ambiente: ilumina todos os objetos igualmente, cor azulada para complementar o fundo.
      const ambientLight = new THREE.AmbientLight(0x4040ff, 1);
      scene.add(ambientLight);

      // Luz direcional principal (Key Light): simula uma fonte de luz principal.
      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
      keyLight.position.set(-5, 5, 5); // Posição para criar sombras e destaques interessantes
      scene.add(keyLight);

      // Luz direcional de preenchimento (Fill Light): suaviza as sombras e adiciona cor secundária.
      const fillLight = new THREE.DirectionalLight(0x00ffff, 0.7);
      fillLight.position.set(5, -5, 2); // Posição oposta à key light
      scene.add(fillLight);
    },
    
    /**
     * @method updateSphereResponsiveness
     * @description Ajusta a visibilidade e escala da esfera com base na largura da tela.
     */
    updateSphereResponsiveness() {
      if (!deformableSphere) return; 

      const screenWidth = window.innerWidth;

      if (screenWidth < 768) {
        deformableSphere.visible = false; // Esconde a esfera em telas pequenas
        // if (energyLines) energyLines.visible = false; // Opcional: esconder partículas também
      } else {
        deformableSphere.visible = true; // Mostra a esfera em telas maiores
        // if (energyLines) energyLines.visible = true; // Opcional: mostrar partículas
        
        // Escala a esfera proporcionalmente à largura da tela
        let scale = Math.max(0.55, Math.min(1.0, screenWidth / 1400));
        deformableSphere.scale.set(scale, scale, scale);
      }
    },

    /**
     * @method onWindowResize
     * @description Lida com o evento de redimensionamento da janela.
     * Atualiza a proporção da câmera e o tamanho do renderer.
     */
    onWindowResize() {
      if (camera && renderer && this.$refs.container) {
        const container = this.$refs.container;
        camera.aspect = container.clientWidth / container.clientHeight; // Atualiza proporção da câmera com base no container
        camera.updateProjectionMatrix(); // Atualiza a matriz de projeção da câmera

        renderer.setSize(container.clientWidth, container.clientHeight); // Redimensiona o renderer
        renderer.setPixelRatio(window.devicePixelRatio); // Reajusta pixel ratio
        this.updateSphereResponsiveness(); // Reajusta a esfera
      }
    },

    /**
     * @method onMouseMove
     * @description Lida com o movimento do mouse, atualizando as coordenadas 2D do mouse.
     * @param {MouseEvent} event - O evento do mouse.
     */
    onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    },

    /**
     * @method animate
     * @description Loop principal de animação da cena Three.js.
     * Chamado recursivamente via requestAnimationFrame.
     */
    animate() {
      animationFrameId = requestAnimationFrame(this.animate);
      this.time += 0.005; // Incrementa o tempo para animações baseadas em tempo
      this.frameCounter++;

      if (this.frameCounter % 3 === 0) {
        if (deformableSphere) {
          deformableSphere.geometry.computeVertexNormals();
        }
      }

      // Animação da esfera deformável
      if (deformableSphere && mousePlane) {
        // Atualiza o raycaster com base na posição do mouse na tela
        raycaster.setFromCamera(mouse, camera);
        // Calcula a interseção do raio com o plano do mouse para obter um ponto 3D de influência
        raycaster.ray.intersectPlane(mousePlane, mouseTarget);
        
        const pointOfInfluence = mouseTarget; // O ponto onde o mouse "toca" a cena
        
        // Rotação automática da esfera
        deformableSphere.rotation.y += 0.001;
        deformableSphere.rotation.x += 0.0005;

        const positions = deformableSphere.geometry.attributes.position.array;
        const vertexCount = originalPositions.length / 3;
        const noiseScale = 0.8; // Escala do ruído de Perlin
        const noiseStrength = 0.15; // Intensidade da deformação pelo ruído
        const mouseDeformStrength = 0.8; // Intensidade da deformação pelo mouse
        const mouseDeformRadius = 2.5; // Raio de influência do mouse
        const lerpFactor = 0.08; // Fator de interpolação para suavizar a animação

        // Itera sobre todos os vértices da esfera para aplicar deformações
        for (let i = 0; i < vertexCount; i++) {
          const i3 = i * 3;
          const originalX = originalPositions[i3];
          const originalY = originalPositions[i3 + 1];
          const originalZ = originalPositions[i3 + 2];
          const currentX = currentVertexPositions[i3];
          const currentY = currentVertexPositions[i3 + 1];
          const currentZ = currentVertexPositions[i3 + 2];

          // Aplica ruído Simplex para deformação orgânica
          const nX = originalX * noiseScale + this.time;
          const nY = originalY * noiseScale + this.time;
          const nZ = originalZ * noiseScale + this.time;
          const noiseValue = noise(nX, nY, nZ);

          const originalNormal = new THREE.Vector3(originalNormals[i3], originalNormals[i3+1], originalNormals[i3+2]);
          
          // Calcula a posição alvo do vértice com base no ruído
          let targetX = originalX + originalNormal.x * noiseValue * noiseStrength;
          let targetY = originalY + originalNormal.y * noiseValue * noiseStrength;
          let targetZ = originalZ + originalNormal.z * noiseValue * noiseStrength;

          // Aplica deformação por influência do mouse
          const vertexWorldPos = new THREE.Vector3(originalX, originalY, originalZ);
          vertexWorldPos.applyMatrix4(deformableSphere.matrixWorld); // Transforma a posição do vértice para o espaço global
          const distance = vertexWorldPos.distanceTo(pointOfInfluence);

          if (distance < mouseDeformRadius) {
            const strength = (1 - (distance / mouseDeformRadius)); // A força diminui com a distância
            const inwardDirection = new THREE.Vector3().subVectors(deformableSphere.position, vertexWorldPos).normalize(); // Direção para o centro
            
            // Move o vértice para dentro (ou para fora, dependendo do sinal da força)
            targetX += inwardDirection.x * strength * mouseDeformStrength;
            targetY += inwardDirection.y * strength * mouseDeformStrength;
            targetZ += inwardDirection.z * strength * mouseDeformStrength;
          }
          
          // Interpolação linear suave para a posição final do vértice
          positions[i3]     = lerp(lerpFactor, currentX, targetX);
          positions[i3 + 1] = lerp(lerpFactor, currentY, targetY);
          positions[i3 + 2] = lerp(lerpFactor, currentZ, targetZ);

          // Atualiza as posições atuais dos vértices para a próxima iteração
          currentVertexPositions[i3]     = positions[i3];
          currentVertexPositions[i3 + 1] = positions[i3 + 1];
          currentVertexPositions[i3 + 2] = positions[i3 + 2];
        }

        // Marca que as posições dos vértices foram atualizadas para o Three.js
        deformableSphere.geometry.attributes.position.needsUpdate = true;
      }

      // Renderiza a cena com a câmera
      if (scene && camera && renderer) {
        renderer.render(scene, camera);
      }
    },

    /**
     * @method createSceneObjects
     * @description Cria e adiciona a esfera deformável à cena.
     */
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
    /**
     * @method createText2DTexture
     * @description Cria uma textura a partir de um canvas HTML com o texto desejado.
     * @param {string} text - O texto a ser renderizado.
     * @param {object} options - Opções de estilização do texto (font, textColor, backgroundColor, padding).
     * @returns {THREE.CanvasTexture} A textura pronta para ser usada em um material.
     */
    createText2DTexture(text, options = {}) {
      const {
        font = 'Bold 800px "Ethnocentric"', // Aumentei bastante o tamanho da fonte padrão
        textColor = '#E3EBF1',
        backgroundColor = 'rgba(0,0,0,0)',
        padding = 40 // Aumentei o padding também
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
      // 1. Criar texturas para "KINETIC" e "SOLUTIONS" usando a nova função
      const kineticTexture = this.createText2DTexture('KINETIC', {
          font: 'Bold 2000px "Ethnocentric"', // Use a fonte desejada
          textColor: '#E3EBF1' // A cor do seu texto de fundo
          // opacity não é passado aqui, será no material
      });

      const solutionsTexture = this.createText2DTexture('SOLUTIONS', {
          font: 'Bold 2000px "Ethnocentric"',
          textColor: '#E3EBF1'
      });

      // 2. Calcular a proporção das texturas para manter o aspecto
      const kineticAspectRatio = kineticTexture.image.width / kineticTexture.image.height;
      const solutionsAspectRatio = solutionsTexture.image.width / solutionsTexture.image.height;

      // 3. Definir o tamanho base dos planos de texto na cena (ajuste 'textHeightInScene' conforme necessário)
      const textHeightInScene = 3; // A altura visual do seu texto na cena 3D

      // 4. Criar as geometrias de plano
      const kineticPlaneGeometry = new THREE.PlaneGeometry(textHeightInScene * kineticAspectRatio, textHeightInScene);
      const solutionsPlaneGeometry = new THREE.PlaneGeometry(textHeightInScene * solutionsAspectRatio, textHeightInScene);

      // 5. Criar materiais com as texturas
      const kineticMaterial = new THREE.MeshBasicMaterial({
          map: kineticTexture,
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 0.4 // Opacidade do material do texto
      });

      const solutionsMaterial = new THREE.MeshBasicMaterial({
          map: solutionsTexture,
          transparent: true,
          side: THREE.DoubleSide,
          opacity: 0.4
      });

      // 6. Criar os meshes
      kineticMesh = new THREE.Mesh(kineticPlaneGeometry, kineticMaterial);
      solutionsMesh = new THREE.Mesh(solutionsPlaneGeometry, solutionsMaterial);

      // 7. Posicionar os meshes
      kineticMesh.position.set(-20, 0.7, -1);
      solutionsMesh.position.set(80, -2, -1); 

      // 8. Adicionar à cena
      scene.add(kineticMesh);
      scene.add(solutionsMesh);
    },
    animateTextToFinalPosition() {
        if (kineticMesh && solutionsMesh) {
            // Anima o kineticMesh
            gsap.to(kineticMesh.position, {
                x: -5,          // Posição X final
                y: 0.7,         // Posição Y final
                z: -1,          // Posição Z final (não muda neste caso, mas é bom ser explícito)
                duration: 2,  // Duração da animação em segundos
                ease: "power2.out" // Tipo de easing para o "ease in-out"
            });

            // Anima o solutionsMesh
            gsap.to(solutionsMesh.position, {
                x: 7,           // Posição X final
                y: -2,          // Posição Y final
                z: -1,          // Posição Z final
                duration: 2,
                ease: "power2.out"
            });
        }
    },
    repeatTextAnimation: function () {
      if (kineticMesh && solutionsMesh) {
        gsap.to(kineticMesh.position, {
            x: -20,          // Posição X final
            y: 0.7,         // Posição Y final
            z: -1,          // Posição Z final (não muda neste caso, mas é bom ser explícito)
            duration: 2,  // Duração da animação em segundos
            ease: "power2.out" // Tipo de easing para o "ease in-out"
        });

        // Anima o solutionsMesh
        gsap.to(solutionsMesh.position, {
            x: 20,           // Posição X final
            y: -2,          // Posição Y final
            z: -1,          // Posição Z final
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
          x: x,          // Posição X final
          y: y,         // Posição Y final
          z: z,          // Posição Z final (não muda neste caso, mas é bom ser explícito)
          duration: 2.2,  // Duração da animação em segundos
          ease: "power2.inOut" // Tipo de easing para o "ease in-out"
      });
      
      gsap.to(deformableSphere.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 2.2,  // Duração da animação em segundos
          ease: "power2.inOut" // Tipo de easing para o "ease in-out"
      });
    }
  },
};
</script>

<style scoped>
/*
 * O contêiner da cena Three.js.
 * Nota: 'width: 96vw' e 'height: 96vh' criarão uma margem de 2vw/2vh em cada lado.
 * Se você deseja que o gradiente preencha *toda* a tela, mesmo nas bordas,
 * o gradiente CSS deve ser aplicado ao <body> ou ao elemento pai do seu componente.
 * Alternativamente, mude width/height para 100vw/100vh e position para fixed.
*/
.three-scene {
  position: fixed;
  touch-action: none;
  top: 1.2rem;
  left: 1.2rem;
  right: 1.2rem;
  bottom: 1.2rem;
  border-radius: 2rem;
  overflow: hidden; /* Importante para o border-radius */
}

/* Garante que o canvas do Three.js preencha 100% do seu contêiner */
.three-scene canvas {
  width: 100% !important;
  height: 100% !important;
  display: block; /* Remove possíveis espaços extras abaixo do canvas */
  border-radius: 2rem;
  overflow: hidden;
}
</style>