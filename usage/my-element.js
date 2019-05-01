class MyElement extends HTMLElement {
    async connectedCallback() {
        this.attachShadow({ mode: 'open' });
        await Promise.resolve;
        this.shadowRoot.innerHTML = `
            <h1>Hello ${this.audienceProp.audience}</h1>
            <p>from ${this.getAttribute('framework-attr')}</p>
            <button id="btn">Click me</button>
        `;
        this.shadowRoot.querySelector('#btn').addEventListener('click', e => {
            const event = new CustomEvent('customEvent', { detail: 'From WC!' });
            this.dispatchEvent(event)
        });
    }
}
customElements.define('my-element', MyElement);