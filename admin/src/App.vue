<template>

  <iframe frameborder="0"></iframe>

  <input type="file" id="img-upload" accept="image/*" style="display: none">

  <div class="loader" v-show="loading">
    <span uk-spinner></span>
  </div>

  <div class="panel" v-if="auth">
    <div>
      <button class="uk-button uk-button-default" uk-toggle="target: #modal-open">Открыть</button>
      <button class="uk-button uk-button-default modal-meta-btn" uk-toggle="target: #modal-meta">Редактировать META
      </button>
    </div>
    <div>
      <button class="uk-button uk-button-primary" uk-toggle="target: #modal-save">Опубликовать</button>
      <button class="uk-button uk-button-primary btn-down">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            d="M384 128h-128V0L384 128zM256 160H384v304c0 26.51-21.49 48-48 48h-288C21.49 512 0 490.5 0 464v-416C0 21.49 21.49 0 48 0H224l.0039 128C224 145.7 238.3 160 256 160zM255 295L216 334.1V232c0-13.25-10.75-24-24-24S168 218.8 168 232v102.1L128.1 295C124.3 290.3 118.2 288 112 288S99.72 290.3 95.03 295c-9.375 9.375-9.375 24.56 0 33.94l80 80c9.375 9.375 24.56 9.375 33.94 0l80-80c9.375-9.375 9.375-24.56 0-33.94S264.4 285.7 255 295z"/>
        </svg>
      </button>
      <div uk-dropdown="pos: bottom-right">
        <button class="uk-button uk-button-default" uk-toggle="target: #modal-backup">Восстановить из бэкапа?</button>
      </div>
      <button class="uk-button uk-button-default" uk-toggle="target: #modal-logout">Выход</button>
    </div>
  </div>

  <div id="modal-open" uk-modal ref="modal-open">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Открыть</h2>
      <ul class="uk-list uk-list-striped">
        <li v-for="page in pageList">
          <a class="uk-link-heading" href="" @click.prevent="openPage(page)">{{ page }}</a>
        </li>
      </ul>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
      </p>
    </div>
  </div>

  <div id="modal-meta" uk-modal ref="modal-meta">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Редактирование META тегов</h2>
      <form>
        <div class="uk-margin">
          <input class="uk-input" type="text" placeholder="Title" v-model="meta.title">
        </div>
        <div class="uk-margin">
          <textarea class="uk-textarea" rows="5" placeholder="Keywords" v-model="meta.keywords"></textarea>
        </div>
        <div class="uk-margin">
          <textarea class="uk-textarea" rows="5" placeholder="Description" v-model="meta.description"></textarea>
        </div>
      </form>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
        <button class="uk-button uk-button-primary" type="button" @click="applyMeta">Применить</button>
      </p>
    </div>
  </div>

  <div id="modal-save" uk-modal ref="modal-save">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Сохранение</h2>
      <p>Вы действительно хотите сохранить и опубликовать изменения?</p>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
        <button
          class="uk-button uk-button-primary"
          type="button"
          @click="onBtnSave"
        >Опубликовать
        </button>
      </p>
    </div>
  </div>

  <div id="modal-backup" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Восстановление из бэкапа</h2>
      <span v-if="!backupList.length > 0">Не найдено резеврных копий этой страницы.</span>
      <ul class="uk-list uk-list-striped">
        <li v-for="backup in backupList">
          <a class="uk-link-heading" href="" @click.prevent="restoreBackup(backup)">Резервная копия от {{
              backup.time
            }}</a>
        </li>
      </ul>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
      </p>
    </div>
  </div>

  <div class="login-container" v-if="!auth">
    <div class="login">
      <h2 class="uk-modal-title">Авторизация</h2>
      Пароль:
      <input type="text" id="password" class="uk-input" placeholder="пароль" v-model="password">
      <span class="login-error" v-if="loginError">Введен неверный пароль.</span>
      <span>Пароль должен быть не менее 6 символов. Введено {{ password.length }}</span>
      <button class="uk-button uk-button-primary" type="button" @click="login">Вход</button>
    </div>
  </div>

  <div id="modal-logout" uk-modal ref="modal-logout">
    <div class="uk-modal-dialog uk-modal-body">
      <h2 class="uk-modal-title">Выход</h2>
      <p>Вы действительно хотите выйти? Все несохраненные данные будут утеряны.</p>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Отмена</button>
        <button
          class="uk-button uk-button-primary"
          type="button"
          @click="logout"
        >Выход
        </button>
      </p>
    </div>
  </div>

</template>

<script>
import Editor from '@/helpers/editor';
import UIkit from 'uikit';
import axios from 'axios';

export default {
  data() {
    return {
      page: 'index.html',
      loading: true,
      pageList: [],
      backupList: [],
      meta: {
        title: '',
        keywords: '',
        description: ''
      },
      auth: false,
      password: '',
      loginError: false
    };
  },
  components: {UIkit},
  methods: {
    onBtnSave() {
      this.loading = true;
      window.editor.save(
        () => {
          this.loadBackupList();
          this.loading = false;
          UIkit.modal(this.$refs["modal-save"]).hide();
          UIkit.notification({message: 'Успешно сохранено', status: 'success'});
        },
        () => {
          this.loading = false;
          UIkit.modal(this.$refs["modal-save"]).hide();
          UIkit.notification({message: 'Ошибка сохранения', status: 'danger'});
        });
    },

    openPage(page) {
      this.page = page;
      this.loadBackupList();
      this.loading = true;
      window.editor.open(page, () => {
        this.loading = false;
        this.meta = window.editor.metaEditor.getMeta();
        UIkit.modal(this.$refs["modal-open"]).hide();
      });
    },

    loadBackupList() {
      axios
        .get('./backups/backups.json')
        .then((res) => {
          this.backupList = res.data.filter((backup) => backup.page === this.page);
        });
    },

    restoreBackup(backup) {
      UIkit.modal.confirm('Вы действительно хотите восстановить страницу из этой резеврной копии? Все несохраненные изменения будут утеряны!',
        {
          labels: {
            ok: 'восстановить',
            cancel: 'отмена'
          }
        })
        .then(() => {
          this.loading = true;
          return axios
            .post('./api/restoreBackup.php', {'page': backup.page, 'file': backup.file});
        })
        .then(() => {
          this.openPage(this.page);
        });
    },

    applyMeta() {
      window.editor.metaEditor.setMeta(this.meta.title, this.meta.keywords, this.meta.description);
      UIkit.modal(this.$refs["modal-meta"]).hide();
    },

    enableLoader() {
      this.loading = true;
    },

    disableLoader() {
      this.loading = false;
    },

    errorNotification(msg) {
      UIkit.notification({message: msg, status: 'danger'});
    },

    login() {
      if (this.password.length > 5) {
        axios.post('./api/login.php', {password: this.password})
          .then(res => {
            if (res.data.auth === true) {
              this.auth = true;
              this.start();
            } else {
              this.loginError = true;
            }
          });
      } else {
        this.loginError = true;
      }
    },

    logout() {
      axios.get('./api/logout.php')
        .then(() => window.location.replace('/miradmin'));
    },

    start() {
      window.editor = new Editor();
      this.openPage(this.page);

      axios.get('./api/pageList.php')
        .then(res => {
          this.pageList = res.data;
        });

      this.loadBackupList();
    }
  },

  mounted() {
    axios.get('./api/checkAuth.php')
      .then((res) => {
        if (res.data.auth === true) {
          this.auth = true;
          this.start();
        }
      });
  }
};
</script>

<style lang="scss">
@import "uikit/src/scss/variables-theme.scss";
@import "uikit/src/scss/mixins-theme.scss";
@import "uikit/src/scss/uikit-theme.scss";

$panel_height: 64px;

.loader {
  position: fixed;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(black, 0.5);

  span {
    color: #fff;
    fill: #fff;
  }
}

.panel {
  display: flex;
  justify-content: space-around;
  padding: 12px;
  height: $panel_height;
  box-sizing: border-box;
  border-bottom: 1px solid #000;
}

.modal-meta-btn {
  margin-left: 10px;
}

.btn-down {
  padding: 0 15px;
  margin-left: 10px;
  margin-right: 10px;
}

svg {
  width: 20px;
  height: 24px;
  margin-top: -4px;

  path {
    fill: #fff;
  }
}

iframe {
  position: absolute;
  left: 0;
  top: $panel_height;
  width: 100%;
  height: calc(100vh - #{$panel_height});
}

.login-container {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(black, 0.5);
  z-index: 1000;

  .login {
    display: flex;
    flex-direction: column;
    width: 600px;
    border-radius: 4px;
    padding: 30px 30px;
    background-color: #fff;

    .login-error {
      color: red;
    }

    button {
      margin: 15px 0 0 0;
      align-self: flex-end;
    }
  }
}

</style>



