class DOMNodeCollection {
  constructor(elements){
    this.elements = elements;
  }
  
  html(str=null) {
    if(str !== null)
      this.elements.forEach((el)=>el.innerHTML=str);
    else
      return this.elements[0].innerHTML;
  }
  
  empty() {
    this.elements.forEach((el)=>el.innerHTML="");
  }
  
  append(input){
    this.elements.forEach((element)=>{
      if(input instanceof HTMLElement)
        element.innerHTML += input.outerHTML;
      else if (el instanceof DOMNodeCollection)
        input.elements.forEach((e)=>element.innerHTML += e.outerHTML);
      else if (typeof el == 'string')
        element.innerHTML += el;
    });
  }
  
  attr(type, value = null){
    let res = [];
    this.elements.forEach((element)=>{
      if(value === null)
        res += element.getAttribute(type);
      else
        element.setAttribute(type, value);
    });
    if(value === null)
      return;
    return res;
  }
  
  addClass(name){
    this.elements.forEach((element)=>{
      let arr = element.getAttribute('class').split(' ');
      let idx = arr.indexOf(name);
      if(idx < 0)
        arr.push(name);
      element.setAttribute('class', arr.join(' '));
    });
  }
  
  removeClass(name){
    this.elements.forEach((element)=>{
      let arr = element.getAttribute('class').split(' ');
      let idx = arr.indexOf(name);
      if(idx >= 0){
        arr.splice(idx, 1);
      }
      if(arr.length === 0)
        element.removeAttribute('class');
      else{
        element.setAttribute('class', arr.join(' '));
      }
    });
  }
  
  children(){
    return this.find('*');
  }
  
  parent(){
    let arr = [];
    this.elements.forEach((el)=>{
      arr.push(el.parentElement);
    });
    return new DOMNodeCollection(arr);
  }
  
  find(selector){
    let arr = [];
    this.elements.forEach((el)=>{
      arr.push(...[].slice.call(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(arr);
  }
  
  remove(){
    this.elements.forEach((el)=>el.outerHTML="");
    this.elements = [];
  }
  
  on(action, func){
    this.elements.forEach((el)=>{
      el.addEventListener(action, func);
    });
  }
  
  off(action, func){
    this.elements.forEach((el)=>{
      el.removeEventListener(action, func);
    });
  }
}

module.exports = DOMNodeCollection;