const axios = require('axios');
const imgSrc = 'img/content/';

module.exports = class EditorImage {
	constructor(element, virtualElement) {
		this.element = element;
		this.virtualElement = virtualElement;

		this.element.addEventListener('click', (e) => this.onClick(e));

		this.imgUploader = document.querySelector('#img-upload');
	}

	onClick(e) {
		this.imgUploader.click();
		e.preventDefault();

		this.imgUploader.onchange = () => {
			if (this.imgUploader.files && this.imgUploader.files[0]) {
				vue.enableLoader();
				let formData = new FormData();
				formData.append('image', this.imgUploader.files[0]);
				axios.post('./api/uploadImage.php', formData, {
					headers: {
						'Content-type': 'multipart/form-data'
					}
				}).then((res) => {
					this.virtualElement.src = this.element.src = imgSrc + res.data.src;
				})
					.catch(() => vue.errorNotification('Ошибка загрузки изображения!'))
					.finally(() => {
						this.imgUploader.value = '';
						vue.disableLoader();
					});
			}
		};
	}
};