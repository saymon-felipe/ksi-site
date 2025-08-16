import moment from 'moment';
import 'moment/dist/locale/pt-br';

export default {
    methods: {
        updateRangeInputs: function () {
            const rangeInputs = document.querySelectorAll('input[type="range"]:not(.mounted).custom-range');
            
            rangeInputs.forEach(input => {
                // 1. Cria a estrutura HTML personalizada
                const wrapper = document.createElement('div');
                wrapper.className = 'custom-range-wrapper';

                const track = document.createElement('div');
                track.className = 'custom-range-track';

                const fill = document.createElement('div');
                fill.className = 'custom-range-fill';

                const thumb = document.createElement('div');
                thumb.className = 'custom-range-thumb';

                // Monta a estrutura
                track.appendChild(fill);
                wrapper.appendChild(track);
                wrapper.appendChild(thumb);
                input.parentNode.appendChild(wrapper);

                // 2. Esconde o input nativo
                input.style.display = 'none';
                input.classList.add("mounted");

                // 3. Função para atualizar o estado visual do range
                const updateCustomRange = () => {
                    const min = parseFloat(input.min);
                    const max = parseFloat(input.max);
                    const val = parseFloat(input.value);

                    const progress = ((val - min) / (max - min)) * 100;

                    // Atualiza o preenchimento e a posição do thumb
                    fill.style.width = `${progress}%`;
                    thumb.style.left = `calc(${progress}% - 10px)`; // -10px para centralizar o thumb
                };
                
                // Sincroniza o input nativo com o customizado
                input.addEventListener('input', updateCustomRange);
                
                // Atualiza a primeira vez para o estado inicial
                updateCustomRange();

                // 4. Adiciona a funcionalidade de arrastar ao thumb
                let isDragging = false;

                const handleMouseDown = (e) => {
                    e.preventDefault();
                    isDragging = true;
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                    wrapper.classList.add('active'); // Opcional: para feedback visual
                    handleMouseMove(e); // Atualiza na primeira clicada
                };

                const handleMouseMove = (e) => {
                if (!isDragging) return;

                const rect = wrapper.getBoundingClientRect();
                const trackRect = track.getBoundingClientRect();
                let newX = e.clientX - rect.left;

                // Limita o movimento dentro da track
                if (newX < 0) newX = 0;
                if (newX > rect.width) newX = rect.width;

                const percentage = (newX / rect.width);
                const min = parseFloat(input.min) || 0;
                const max = parseFloat(input.max) || 100;
                const newValue = min + percentage * (max - min);

                // Atualiza o input nativo, que por sua vez dispara o evento 'input'
                input.value = newValue;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                };

                const handleMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                wrapper.classList.remove('active');
                };

                wrapper.addEventListener('mousedown', handleMouseDown);
            });
        },
        formatRelativeDate: function (date) {
            return moment(date).fromNow();
        },
        calculateContrastColor(hexColor) {
            let r = parseInt(hexColor.slice(1, 3), 16);
            let g = parseInt(hexColor.slice(3, 5), 16);
            let b = parseInt(hexColor.slice(5, 7), 16);

            let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            return luminance > 0.5 ? "#000000" : "#FFFFFF";
        }
    },
    mounted: function () {
        moment.locale("pt-br");
        
        this.updateRangeInputs();
    }
}