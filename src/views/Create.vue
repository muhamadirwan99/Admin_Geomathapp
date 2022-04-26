<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="div col-8">
        <router-link
          :to="{ name: 'index' }"
          class="btn btn-primary btn-sm rounded shadow mb-3"
          >Back</router-link
        >
        <div class="card rounded shadow">
          <div class="card-header">Add Video</div>
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
                <input id="file" v-on:change="onFileSelected" type="file" />
              </div>
              <button class="btn btn-outline-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  setup() {
    let file = ref(null);

    // data binding
    const video = reactive({
      name: "",
      idYt: "",
      desc: "",
      thumbnail: "",
    });

    const validation = ref([]);

    const router = useRouter();

    function store() {
      try {
        const formData = new FormData();
        formData.append("name", video.name);
        formData.append("idYt", video.idYt);
        formData.append("desc", video.desc);
        formData.append("thumbnail", file, file.name);
        axios
          .post("http://127.0.0.1:5000/api/videos", formData)
          .then(() => {
            router.push({
              name: "index",
            });
          })
          .catch((err) => {
            validation.value = err.response.data;
          });
      } catch (err) {
        validation.value = err.response.data;
      }
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
