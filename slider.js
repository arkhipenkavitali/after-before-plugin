function getTemplate(state){
    return `
        <div class="slider__before" style="width: ${state.width}px; background-image: url(${state.before})">
            <div class="slider__resize" data-type="resize"></div>
        </div>
        <div class="slider__after" style="background-image: url(${state.after})"></div>
    `;
}

class Slider {
    constructor(selector, state) {
        this.$slider = document.getElementById(selector);
        this.state = {
            ...state,
            width: state.width || 512
        };
        this.#render(this.state)
        this.#listen()
    }

    #render(state) {
        this.$slider.innerHTML = getTemplate(state)
    }

    #update(props){
        this.state = {
            ...this.state,
            ...props
        }
        this.#render(this.state)
    }

    #listen(){
        this.mouseDownHandler = this.mouseDownHandler.bind(this)
        this.mouseUpHandler = this.mouseUpHandler.bind(this)
        this.moveHandler = this.moveHandler.bind(this)
        this.$slider.addEventListener('mousedown', this.mouseDownHandler)
        this.$slider.addEventListener('mouseup', this.mouseUpHandler)
    }

    mouseDownHandler(e) {
        if(e.target.dataset.type === 'resize'){
            this.$slider.addEventListener('mousemove', this.moveHandler)
            this.currentClientX = e.clientX
        }
    }

    mouseUpHandler(e) {
        this.$slider.removeEventListener('mousemove', this.moveHandler)
    }

    moveHandler(e) {
        let newClientX = this.currentClientX - e.clientX
        this.#update({width: this.state.width - newClientX})
        this.currentClientX = e.clientX
        console.log(newClientX)
    }
}

const slider = new Slider('slider', {
    after: './kazbegi.jpg',
    before: './wine.jpg'
})