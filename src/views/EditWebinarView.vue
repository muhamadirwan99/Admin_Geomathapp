<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Edit Webinar</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="update()">
              <div class="mb-3">
                <label for="" class="form-label">Nama</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="webinar.name"
                />
                <div v-if="validation.name" class="text-danger">
                  {{ validation.name }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Deskripsi</label>
                <textarea
                  type="text"
                  class="form-control"
                  v-model="webinar.desc"
                ></textarea>
                <div v-if="validation.desc" class="text-danger">
                  {{ validation.desc }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Link Pendaftaran</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="webinar.link"
                />
                <div v-if="validation.link" class="text-danger">
                  {{ validation.link }}
                </div>
              </div>
              <div class="mb-3">
                <label for="date" class="form-label">Tanggal</label>
                <input
                  id="date"
                  type="date"
                  class="form-control"
                  v-model="webinar.date"
                />
                <div v-if="validation.date" class="text-danger">
                  {{ validation.date }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Pamflet Terkini</label><br />
                <img
                  :src="'http://34.101.97.232:5000/' + webinar.thumbnail"
                  width="300"
                  class="img-thumbnail mb-3"
                /><br />
                <label for="" class="form-label">Pamflet</label><br />
                <input
                  id="file"
                  @change="onFileSelected"
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
    let file = ref(null);

    // data binding
    let webinar = reactive({
      name: "",
      desc: "",
      link: "",
      date: "",
      thumbnail: "",
      status: "",
    });

    const validation = ref([]);

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://34.101.97.232:5000/api/webinars/${route.params.id}`)
        .then((result) => {
          webinar.name = result.data.data.name;
          webinar.desc = result.data.data.desc;
          webinar.link = result.data.data.link;
          webinar.date = result.data.data.date;
          webinar.thumbnail = result.data.data.thumbnail;
          webinar.status = result.data.data.status;
        })
        .catch((err) => {
          console.log(err);
        });
    });

    function update() {
      const formData = new FormData();
      formData.append("name", webinar.name);
      formData.append("desc", webinar.desc);
      formData.append("link", webinar.link);
      formData.append("date", webinar.date);
      if (file._value === null) {
        formData.append("thumbnail", webinar.thumbnail);
      } else {
        formData.append("thumbnail", file, file.name);
      }
      formData.append("status", true);
      axios
        .put(
          `http://34.101.97.232:5000/api/webinars/${route.params.id}`,
          formData
        )
        .then(() => {
          router.push({
            name: "webinar",
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
      webinar,
      validation,
      router,
      update,
      onFileSelected,
      file,
    };
  },
};
</script>
