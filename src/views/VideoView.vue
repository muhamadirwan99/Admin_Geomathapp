<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Add Video</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store()">
              <div class="mb-3">
                <label for="" class="form-label">Nama</label>
                <input type="text" class="form-control" v-model="video.name" />
                <div v-if="validation.name" class="text-danger">
                  {{ validation.name }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Deskripsi</label>
                <input type="text" class="form-control" v-model="video.desc" />
                <div v-if="validation.desc" class="text-danger">
                  {{ validation.desc }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">ID Video Youtube</label>
                <input type="text" class="form-control" v-model="video.idYt" />
                <div v-if="validation.idYt" class="text-danger">
                  {{ validation.idYt }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Thumbnail</label><br />
                <input
                  id="file"
                  @change="onFileSelected"
                  type="file"
                  class="form-control"
                />
              </div>
              <button class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    let file = null;

    // data binding
    const video = {
      name: "",
      idYt: "",
      desc: "",
      thumbnail: "",
    };

    const validation = [];

    const router = useRouter();

    function store() {
      const formData = new FormData();
      formData.append("name", video.name);
      formData.append("idYt", video.idYt);
      formData.append("desc", video.desc);
      console.log("File : " + file);
      console.log("File name: " + file.name);
      formData.append("thumbnail", file, file.name);
      for (var pair of formData.entries()) {
        console.log(pair);
      }
      axios
        .post("http://127.0.0.1:5000/api/videos", formData)
        .then(() => {
          router.push({
            name: "home",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    function onFileSelected(event) {
      file = event.target.files[0];
    }

    return {
      video,
      validation,
      router,
      store,
      onFileSelected,
      file,
    };
  },
};
</script>
