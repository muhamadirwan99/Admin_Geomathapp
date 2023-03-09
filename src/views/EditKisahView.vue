<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Edit Kisah Inspiratif</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="update()">
              <div class="mb-3">
                <label for="" class="form-label">Judul</label>
                <input type="text" class="form-control" v-model="kisah.name" />
                <div v-if="validation.name" class="text-danger">
                  {{ validation.name }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Sumber</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="kisah.sumber"
                />
                <div v-if="validation.sumber" class="text-danger">
                  {{ validation.sumber }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Link Artikel</label>
                <input type="text" class="form-control" v-model="kisah.link" />
                <div v-if="validation.link" class="text-danger">
                  {{ validation.link }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Thumbnail Terkini</label><br />
                <img
                  :src="'http://34.101.97.232:5000/' + kisah.thumbnail"
                  width="300"
                  class="img-thumbnail mb-3"
                /><br />
                <label for="" class="form-label">Thumbnail</label><br />
                <input
                  id="file"
                  @change="onThumbnailSelected"
                  type="file"
                  class="form-control"
                  accept="image/*"
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

    // data binding
    let kisah = reactive({
      name: "",
      sumber: "",
      link: "",
      thumbnail: "",
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://34.101.97.232:5000/api/kisah/${route.params.id}`)
        .then((result) => {
          kisah.name = result.data.data.name;
          kisah.sumber = result.data.data.sumber;
          kisah.link = result.data.data.link;
          kisah.thumbnail = result.data.data.thumbnail;
        })
        .catch((err) => {
          console.log(err);
        });
    });
    function update() {
      const formData = new FormData();
      formData.append("name", kisah.name);
      formData.append("sumber", kisah.sumber);
      formData.append("link", kisah.link);
      if (thumbnail._value === null) {
        formData.append("thumbnail", kisah.thumbnail);
      } else {
        formData.append("thumbnail", thumbnail, thumbnail.name);
      }
      axios
        .put(`http://34.101.97.232:5000/api/kisah/${route.params.id}`, formData)
        .then(() => {
          router.push({
            name: "kisah",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    function onThumbnailSelected(event) {
      thumbnail = event.target.files[0];
    }

    return {
      kisah,
      validation,
      router,
      update,
      onThumbnailSelected,
      thumbnail,
    };
  },
};
</script>
