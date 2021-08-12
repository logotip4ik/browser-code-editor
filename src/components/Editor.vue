<template>
  <div class="tabs cm-s-panda-syntax">
    <header class="tabs__header">
      <div
        v-for="({ title }, idx) in TABS"
        :key="idx"
        :class="{
          tabs__header__item: true,
          'tabs__header__item--selected': idx === currentTab,
        }"
        @click="currentTab = idx"
      >
        {{ title }}
      </div>
    </header>
    <div class="editor" ref="editorEl"></div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { inject, onMounted, ref, watch } from 'vue';
import CodeMirror from 'codemirror/lib/codemirror';

import { initCodeMirror } from '../helpers/initCodeMirror';

export default {
  setup(_, { emit }) {
    const localStoragePrefix = inject('localStoragePrefix');
    const editorEl = ref(null);

    let EDITOR = {};
    const buffers = {};
    const TABS = [
      {
        title: 'HTML',
        type: 'htmlmixed',
      },
      {
        title: 'CSS',
        type: 'css',
      },
      {
        title: 'JS',
        type: 'javascript',
      },
    ];
    const currentTab = ref(0);

    function debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), timeout);
      };
    }
    function selectBuffer(editor, name) {
      let buf = buffers[name];
      if (buf.getEditor()) buf = buf.linkedDoc({ sharedHist: true });
      const old = editor.swapDoc(buf);
      let linked = old.iterLinkedDocs((doc) => {
        linked = doc;
      });
      if (linked) {
        // Make sure the document in buffers is the one the other view is looking at
        const names = Object.keys(buffers);
        for (let i = 0; i < names.length; i += 1) if (buffers[name] === old) buffers[name] = linked;

        old.unlinkDoc(linked);
      }
    }
    function openBuffer(name, text, mode) {
      buffers[name] = CodeMirror.Doc(text, mode);
    }
    function setupListeners() {
      const listener = debounce((target, { shiftKey, key }) => {
        if (shiftKey && key === 'Tab') return;
        const { name: type } = target.doc.getMode();
        const value = target.getValue();
        emit('update', { type, value });
      }, 550);

      EDITOR.on('keyup', listener);

      window.addEventListener(
        'keydown',
        ({ shiftKey, key }) => {
          if (shiftKey && key === 'Tab') currentTab.value = (currentTab.value + 1) % TABS.length;
        },
        true,
      );
    }

    onMounted(() => {
      const htmlmixed = localStorage.getItem(`${localStoragePrefix}html`);
      const css = localStorage.getItem(`${localStoragePrefix}css`);
      const javascript = localStorage.getItem(`${localStoragePrefix}javascript`);

      const values = { htmlmixed, css, javascript };

      EDITOR = initCodeMirror({
        target: editorEl.value,
        isHtml: true,
        opts: {
          extraKeys: {
            Tab: 'emmetExpandAbbreviation',
            Esc: 'emmetResetAbbreviation',
            Enter: 'emmetInsertLineBreak',
            'Ctrl-Space': 'autocomplete',
          },
        },
      });
      TABS.forEach((tab) => {
        const value = values[tab.type] || '';
        openBuffer(tab.title, value, tab.type);
        // Need to wait, becouse iframe is not fully loaded
        setTimeout(() => emit('update', { type: tab.type, value, initial: true }), 100);
      });
      selectBuffer(EDITOR, TABS[currentTab.value].title);
      setupListeners();
    });

    watch(currentTab, (val) => selectBuffer(EDITOR, TABS[val].title));

    return { editorEl, TABS, currentTab };
  },
  emits: ['update'],
};
</script>

<style lang="scss">
.tabs {
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &__header {
    $border-color: darken(
      $color: #ccc,
      $amount: 20,
    );
    width: 100%;
    display: grid;
    grid-auto-flow: row;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    font-family: system-ui, sans-serif;

    &__item {
      width: 100%;
      padding: 0.25rem 0;
      border-right: 1px solid $border-color;
      border-left: 1px solid $border-color;
      border-bottom: 1px solid $border-color;
      text-align: center;
      font-weight: 400;
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

      &:hover {
        transition: none;
        color: #ff75b5;
        background-color: transparentize($color: #fff, $amount: 0.99);
        cursor: pointer;
      }

      &--selected {
        color: #ff75b5;
        // font-weight: bold;
        border-color: #ff75b5;
        background-color: transparentize($color: #fff, $amount: 0.95);
      }
    }
  }
}

.CodeMirror {
  height: 100%;
}
.editor {
  height: 100%;
  width: 100%;
}
</style>
