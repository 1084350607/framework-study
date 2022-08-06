const { effect, ref } = VueReactivity


// 渲染器

const vnode = {
  tag: 'div',
  props: {
    onClick: () => alert('click me')
  },
  children: [{
    tag: 'span',
    props: {
      onClick: () => alert('string type'),
      id: '123'
    },
    children: 'innter'
  }]
}

function createRenderer () {
  function mountElement(vnode, container) {
    const el = document.createElement(vnode.tag)

    for(let key in vnode.props) {
      // 事件监听
      if (key.startsWith('on')) {
        // click
        el.addEventListener(key.slice(2).toLowerCase(), vnode.props[key])
      } else {
      }
    }

    if (typeof vnode.children === 'string') {
      el.appendChild(document.createTextNode(vnode.children))
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(child => mountElement(child, el))
    }

    container.appendChild(el)
  }

  function patch(oldVNode, newVNode, container) {
    if (!oldVNode) {
      // 挂载阶段
      mountElement(newVNode, container)
    } else {
      // patch ： 找出前后vnode的不同
    }
  }

  function render(vnode, container) {
    if (vnode) {
      // oldVNode newVNode, container
      patch(container._vnode, vnode, container)
    } else {
      // 卸载
      container.innerHTML = ''
    }

    container._vnode = vnode
  }

  function hydrate (vnode, container) {
    // TODO:
  }

  return {
    render,
    hydrate
  }
}

// patch: 打补丁: 找出不同，避免每次执行渲染器的时候都全部重新渲染

const app = createRenderer()
// 首次渲染 1
app.render(vnode, document.getElementById('app'))
// // 首次渲染 2
// app.render(`<h1>renderer 2</h1>`, document.getElementById('app'))
// // 首次渲染 3
// app.render(`<h1>renderer 3</h1>`, document.getElementById('app'))

// // 响应式结合起来

// let count = ref(3)

// effect(() => {
//   renderer(`<h1>${count.value}</h1>`, document.querySelector('#app'))
// })

// count.value++
