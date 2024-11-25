class $Elements {
  private elements: Array<Element>;

  constructor(elems: NodeListOf<Element>) {
    this.elements = Array.from(elems);
  }

  set(prop: string, value: string) {
    this.elements.forEach((elem) => {
      elem.setAttribute(prop, value);
    });
  }

  get(prop) {
    // if prop get attributes
    if (isNaN(Number(prop))) {
      const props = this.elements.map((elem) => {
        return elem.getAttribute(prop);
      });

      if (props.length == 1) {
        return props[0];
      } else {
        return props;
      }
    }
    // if index get element
    else {
      return this.elements[prop];
    }
  }
}

export function $(query: string) {
  const proxy = new Proxy(new $Elements(document.querySelectorAll(query)), {
    get(obj, prop) {
      // if prop is not a number
      if (isNaN(Number(prop)) == true) {
        return obj[prop];
      }
      // prop is an index
      else {
        return obj.get(prop);
      }
    },
  });
  return proxy;
}
