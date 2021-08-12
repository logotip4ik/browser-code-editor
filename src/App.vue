<template>
  <div class="main">
    <Editor @update="updateEntry"></Editor>
    <iframe frameborder="0" ref="iframe"></iframe>
  </div>
</template>

<script>
import { onMounted, ref, provide } from 'vue';
import Editor from './components/Editor.vue';

export default {
  setup() {
    const localStoragePrefix = '__browser_code_edior__';
    provide('localStoragePrefix', localStoragePrefix);

    const iframe = ref(null);
    let createdIframeApp = false;
    let createdIframeStyleTag = false;
    // let CSSBlobLink = null;

    function updateEntry({ type, value, initial = false }) {
      const iframeDoc = iframe.value.contentDocument;
      switch (type) {
        case 'htmlmixed':
          if (!initial) localStorage.setItem(`${localStoragePrefix}html`, value);
          if (createdIframeApp) {
            iframeDoc.getElementById('app').innerHTML = value;
            return;
          }

          // eslint-disable-next-line no-case-declarations
          const iframeApp = document.createElement('div');
          iframeApp.id = 'app';
          iframeApp.style.width = '100%';
          iframeApp.style.minHeight = '100%';
          iframeApp.innerHTML = value;

          iframeDoc.body.appendChild(iframeApp);
          createdIframeApp = true;
          break;
        case 'css':
          if (!initial) localStorage.setItem(`${localStoragePrefix}css`, value);
          if (createdIframeStyleTag) {
            iframeDoc.head.children[0].innerHTML = value;
            return;
          }

          // eslint-disable-next-line no-case-declarations
          const iframeStyle = document.createElement('style');
          iframeStyle.innerHTML = value;
          iframeDoc.head.appendChild(iframeStyle);
          createdIframeStyleTag = true;

          break;
        case 'javascript':
          if (!initial) localStorage.setItem(`${localStoragePrefix}javascript`, value);
          // eslint-disable-next-line no-case-declarations
          const iframeWindow = iframe.value.contentWindow;

          try {
            // Need to call "new Function" within the iframe context
            iframeWindow.FUNC_THAT_YOU_WILL_NEVER_GUESS = new iframeWindow.Function(
              `return function() {${value}}`,
            );
            // First call will return fucntion that user typed, then we will run it
            // prettier-ignore
            iframeWindow
              .FUNC_THAT_YOU_WILL_NEVER_GUESS()();
          } catch (error) {
            console.warn(error.message);
          }
          break;
        default:
          break;
      }
    }

    onMounted(() => {
      const iframeDoc = iframe.value.contentDocument;
      const iframeWindow = iframe.value.contentWindow;
      window.addEventListener('keydown', (e) => {
        if (!e.ctrlKey || e.key !== 's') return;
        e.preventDefault();
        const bodyContent = iframeDoc.body.innerHTML;
        const headContent = iframeDoc.head.innerHTML;
        iframeWindow.location.reload();
        iframeDoc.body.innerHTML = bodyContent;
        iframeDoc.head.innerHTML = headContent;
      });
    });

    return { iframe, updateEntry };
  },
  components: {
    Editor,
  },
};
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  scrollbar-width: none;
}

html,
body,
#app {
  height: 100vh;
  font-family: system-ui, sans-serif;
}

.main {
  max-height: 100vh;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: clamp(100px, 60%, 800px) auto;
}

iframe {
  width: 100%;
  height: 100vh;
  overflow: auto;
}
</style>
