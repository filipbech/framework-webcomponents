import React from 'react';
import ReactDOM from 'react-dom';
import {
  pipe,
  isBoolConvention,
  isHandlerConvention,
  objectFromArray,
  mapObject,
  mapObjectKeys,
  sanitizeAttributeName,
  setBooleanAttribute,
} from './util';

const Types = {
  bool: 'bool',
  event: 'event',
  json: 'json',
};

const mapAttributeToProp = (node, name) =>
  // return 'undefined' instead of 'null' for missing attributes / properties
  // so that React's default props apply
  node[name] === null ? undefined : node[name];

const mapEventToProp = (node, name) => {
  // accessing properties instead of attributes here
  // (autom. attribute parsing)
  const handler = node[name];

  return (...origArgs) => {
    // dispatch DOM event
    const domEvent = new CustomEvent(name, {
      bubbles: true,
      cancelable: true,
      detail: origArgs, // store original arguments from handler
    });
    node.dispatchEvent(domEvent);

    // call event handler if defined
    if (typeof handler === 'function') {
      handler.call(node, domEvent);
    }
  };
};

const mapToProps = (node, mapping) => {
  const mapFunc = (type, name) =>
    type === Types.event
      ? mapEventToProp(node, name)
      : mapAttributeToProp(node, name);
  return mapObject(mapFunc, mapping);
};

const mapToPropertyDescriptor = (name, type) => {
  const defaults = { enumerable: true, configurable: true };

  // handlers
  if (type === Types.event) {
    let eventHandler;
    return {
      ...defaults,
      get() {
        // return event handler assigned via propery if available
        if (typeof eventHandler !== 'undefined') return eventHandler;

        // return null if event handler attribute wasn't defined
        const value = this.getAttribute(name);
        if (value === null) return null;

        // try to return a function representation of the event handler attr.
        try {
          // eslint-disable-next-line no-new-func
          return new Function(value);
        } catch (err) {
          return null;
        }
      },
      set(value) {
        eventHandler = typeof value === 'function' ? value : null;
        this.attributeChangedCallback();
      },
    };
  }

  // booleans
  if (type === Types.bool) {
    return {
      ...defaults,
      get() {
        return this.hasAttribute(name);
      },
      set(value) {
        setBooleanAttribute(this, name, value);
      },
    };
  }

  // json
  return {
    ...defaults,
    get() {
      const value = this.getAttribute(name);

      // try to parse as JSON
      try {
        return JSON.parse(value);
      } catch (e) {
        return value; // original string as fallback
      }
    },
    set(value) {
      const str = typeof value === 'string' ? value : JSON.stringify(value);
      this.setAttribute(name, str);
    },
  };
};

const definePropertiesFor = (WebComponent, mapping) => {
  Object.keys(mapping).forEach((name) => {
    const type = mapping[name];

    Object.defineProperty(
      WebComponent.prototype,
      name,
      mapToPropertyDescriptor(name, type),
    );
  });
};

const getType = (name) => {
  if (isBoolConvention(name)) {
    return Types.bool;
  }
  if (isHandlerConvention(name)) {
    return Types.event;
  }
  return Types.json;
};

/**
 * Function to convert a React Components to a Web Components
 * @param {class} ReactComponent - A react component
 * @param {string[]} [propNames] - An optional list of property names to be
 * connected with the React component.
 * @param {Object} [eventMappers] - An optional map of functions which can
 * return an event to be dispatched
 * @returns {class} - The custom element class
 */
function convert(
  ReactComponent,
  propNames = [],
  eventMappers = {},
  options = { useShadowDOM: true },
) {
  const createMap = obj => objectFromArray(getType, obj);
  const cleanKeys = obj => mapObjectKeys(sanitizeAttributeName, obj);
  const mapping = pipe(createMap, cleanKeys)(propNames);

  const attributeNames = Object.keys(mapping).map(name => name.toLowerCase());

  const dispatcher = component => mapper => (...args) => {
    const event = mapper(...args);
    if (event) {
      component.dispatchEvent(event);
    }
  };

  // render should be private
  const render = (component) => {
    const props = {
      ...mapToProps(component, mapping),
      // add event mappers, will possibly override the ones in attribute
      ...mapObject(dispatcher(component), eventMappers),
    };

    const rootElement = options.useShadowDOM ? component.shadowRoot : component;

    ReactDOM.render(
      React.createElement(ReactComponent, props, React.createElement('slot')),
      rootElement,
    );
  };

  class WebReactComponent extends HTMLElement {
    static get observedAttributes() {
      return attributeNames;
    }

    constructor() {
      super();
      if (options.useShadowDOM) {
        this.attachShadow({ mode: 'open' });
      }
    }

    connectedCallback() {
      render(this);
    }

    attributeChangedCallback() {
      render(this);
    }

    disconnectedCallback() {
      const rootElement = options.useShadowDOM ? this.shadowRoot : this;

      ReactDOM.unmountComponentAtNode(rootElement);
    }
  }

  // dynamically create property getters and setters for attributes
  // and event handlers
  definePropertiesFor(WebReactComponent, mapping);

  return WebReactComponent;
}

/**
 * Function to register React Components as Web Components
 * @param {class} ReactComponent - A react component
 * @param {string} tagName - A name for the new custom tag
 * @param {string[]} [propNames] - An optional list of property names to be
 * connected with the React component.
 * @param {Object} [eventMappers] - An optional map of functions which can
 * return an event to be dispatched
 * @returns {class} - The custom element class
 */
function register(
  ReactComponent,
  tagName,
  propNames = [],
  eventMappers = {},
  options = { useShadowDOM: true },
) {
  return customElements.define(
    tagName,
    convert(ReactComponent, propNames, eventMappers, options),
  );
}

export default {
  register,
  convert,
};

export { register, convert };
