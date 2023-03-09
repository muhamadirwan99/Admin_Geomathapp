<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Edit Video</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="update()">
              <div class="mb-3">
                <label for="" class="form-label">Nama</label>
                <input type="text" class="form-control" v-model="video.name" />
                <div v-if="validation.name" class="text-danger">
                  {{ validation.name }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Deskripsi</label>
                <textarea
                  type="text"
                  class="form-control"
                  v-model="video.desc"
                ></textarea>
                <div v-if="validation.desc" class="text-danger">
                  {{ validation.desc }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Link Video Youtube</label>
                <input type="text" class="form-control" v-model="video.idYt" />
                <div v-if="validation.idYt" class="text-danger">
                  {{ validation.idYt }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Modul Terkini</label><br />
                <input
                  type="text"
                  class="form-control mb-3"
                  v-model="video.modul"
                  disabled
                />
                <label for="" class="form-label">Modul</label><br />
                <input
                  id="modul"
                  @change="onModulSelected"
                  type="file"
                  class="form-control"
                  accept=".pdf, .doc, .docx"
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
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

export default {
  setup() {
    let thumbnail = ref(null);
    let modul = ref(null);

    // data binding
    let video = reactive({
      name: "",
      idYt: "",
      desc: "",
      thumbnail: "",
      modul: "",
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://34.101.97.232:5000/api/videos/${route.params.id}`)
        .then((result) => {
          video.name = result.data.data.name;
          video.desc = result.data.data.desc;
          video.idYt =
            "https://www.youtube.com/watch?v=" + result.data.data.idYt;
          video.thumbnail = result.data.data.thumbnail;
          video.modul = result.data.data.modul.replace("public/moduls/", "");
        })
        .catch((err) => {
          console.log(err);
        });
    });
    function update() {
      var url = new URL(video.idYt);
      var idyt = url.searchParams.get("v");

      const formData = new FormData();
      formData.append("name", video.name);
      formData.append("idYt", idyt);
      formData.append("desc", video.desc);

      if (modul._value === null) {
        formData.append("modul", video.modul);
      } else {
        formData.append("modul", modul, modul.name);
      }
      axios
        .put(
          `http://34.101.97.232:5000/api/videos/${route.params.id}`,
          formData
        )
        .then(() => {
          router.push({
            name: "video",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    function onThumbnailSelected(event) {
      thumbnail = event.target.files[0];
    }

    function onModulSelected(event) {
      modul = event.target.files[0];
    }

    return {
      video,
      validation,
      router,
      update,
      onModulSelected,
      modul,
    };
  },
};
</script>
