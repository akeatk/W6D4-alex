const DOMNC = require('./dom_node_collection.js');

Window.prototype.$l = function(selector){
  if(selector instanceof HTMLElement)
    return new DOMNC([selector]);
  if(typeof selector === 'string')
    return new DOMNC([].slice.call(document.querySelectorAll(selector)));
  if(selector instanceof Function){
    if(this.funcs === undefined){
      this.funcs = [];
    }
    this.funcs.push(selector);
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.funcs.forEach((el)=>el());
      }
    };
  }
};


$l(()=>{
  $l('li').on('click',(e)=>{
    console.log('LIST ITEM');
    console.log(e.target);
    console.log(e.currentTarget);
  });
});
$l(()=>{
  $l('ul').on('click',(e)=>{
    console.log('UNORDERED LIST');
    console.log(e.target);
    console.log(e.currentTarget);
  });
});
$l(()=>{
  $l('div').on('click',(e)=>{
    console.log('DIV');
    console.log(e.target);
    console.log(e.currentTarget);
  });
});