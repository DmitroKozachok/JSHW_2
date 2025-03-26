const imageInput = document.getElementById("imageInput");
const chooseImageBtn = document.getElementById("chooseImageBtn");
const previewImage = document.getElementById("previewImage");
const modalImage = document.getElementById("modalImage");
const rotateLeftBtn = document.getElementById("rotateLeft");
const rotateRightBtn = document.getElementById("rotateRight");
const saveImageBtn = document.getElementById("saveImage");
const cancelBtn = document.getElementById("cancelImage");
const imageModalElement = document.getElementById("imageModal");
const imageModal = new bootstrap.Modal(imageModalElement);

let cropper;
let uploadedImageURL = null;
let tempImageSrc = previewImage.src;

chooseImageBtn.addEventListener("click", function () {
    imageInput.click();
});

imageInput.addEventListener("change", function (e) {
    const file = e.target.files[0];

    if (/^image\/\w+/.test(file.type)) {
        if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
        }

        uploadedImageURL = URL.createObjectURL(file);
        modalImage.src = uploadedImageURL;
        previewImage.src = uploadedImageURL;

        imageModal.show();

        imageModalElement.addEventListener("shown.bs.modal", () => {
            if (cropper) {
                cropper.destroy();
            }

            cropper = new Cropper(modalImage, {
                aspectRatio: 1,
                viewMode: 1,
                autoCrop: true
            });
        });

    }
});

rotateLeftBtn.addEventListener("click", function () {
    if (cropper) {
        cropper.rotate(-90);
    }
});

rotateRightBtn.addEventListener("click", function () {
    if (cropper) {
        cropper.rotate(90);
    }
});

saveImageBtn.addEventListener("click", function () {
    if (cropper) {
        const croppedCanvas = cropper.getCroppedCanvas();
        if (croppedCanvas) {
            previewImage.src = croppedCanvas.toDataURL("image/png");
            tempImageSrc = previewImage.src;
            imageModal.hide();
        }
    }
});

cancelBtn.addEventListener("click", function () {
    previewImage.src = tempImageSrc;
    if (cropper) {
        cropper.destroy();
    }
    imageModal.hide();
});