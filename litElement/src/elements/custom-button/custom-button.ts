import { LitElement, html, customElement, css, property } from "lit-element";

@customElement("custom-button")
export class CustomButtonElement extends LitElement {
    static styles = css`
        h1 {
            color:blue;
        }
    `;

    @property() label = 'default label';
    @property() clicksCt = 0;

    handleClick() {
        this.clicksCt++;
        this.dispatchEvent(new CustomEvent('action', { detail: this.clicksCt }));
    }

    render() {
        const { handleClick, label, clicksCt } = this;
        return html`
            <h1>Im inside header</h1>
            <button @click=${handleClick}">
                <slot>${label}</slot>: ${clicksCt}
            </button>
        `;
    }
}