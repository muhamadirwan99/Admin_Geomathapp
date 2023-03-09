<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Add Webinar</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store()">
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
                <label for="" class="form-label">Pamflet</label><br />
                <input
                  id="file"
                  @change="onThumbnailSelected"
                  type="file"
                  class="form-control"
                  accept="image/*"
                />
                <div v-if="validation.thumbnail" class="text-danger">
                  {{ validation.thumbnail }}
                </div>
              </div>
              <button class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">List Webinar</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead class="text-primary">
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th>Link Pendaftaran</th>
                    <th>Tanggal</th>
                    <th>Pamflet</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr v-for="(webinar, index) in webinars.data" :key="index">
                      <td>{{ webinar.name }}</td>
                      <td>{{ webinar.desc }}</td>
                      <td>
                        <a v-bind:href="webinar.link">Link webinar</a>
                      </td>
                      <td>{{ webinar.date }}</td>
                      <td>
                        <img
                          :src="
                            'http://34.101.97.232:5000/' + webinar.thumbnail
                          "
                          width="300"
                          class="img-thumbnail"
                        />
                      </td>
                      <td>
                        <div class="btn-group">
                          <router-link
                            :to="{
                              name: 'editwebinar',
                              params: { id: webinar.id },
                            }"
                            class="btn btn-sm btn-outline-info"
                            >Edit</router-link
                          >
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-danger"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            @click="getId(webinar.id)"
                          >
                            Delete
                          </button>
                          <!-- Modal -->
                          <div
                            class="modal fade"
                            id="exampleModal"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div class="modal-dialog" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5
                                    class="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    Delete Tips
                                  </h5>
                                  <button
                                    type="button"
                                    class="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div class="modal-body">
                                  Apakah anda yakin ingin menghapus ini?
                                </div>
                                <div class="modal-footer">
                                  <button
                                    type="button"
                                    class="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-danger"
                                    @click.prevent="destroy(idWebinar, index)"
                                    data-dismiss="modal"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    // reactive state
    let webinars = ref([]);
    let thumbnail = ref(null);
    let modul = ref(null);
    let idWebinar = ref(null);
    const validation = ref([]);
    const router = useRouter();

    // data binding
    const webinar = reactive({
      name: "",
      desc: "",
      link: "",
      date: "",
      thumbnail: "",
      status: "",
    });

    onMounted(() => {
      // get data from api endpoint
      axios
        .get("http://34.101.97.232:5000/api/webinars")
        .then((result) => {
          webinars.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    function store() {
      const formData = new FormData();
      formData.append("name", webinar.name);
      formData.append("desc", webinar.desc);
      formData.append("link", webinar.link);
      formData.append("date", webinar.date);
      if (thumbnail._value === null) {
        formData.append("thumbnail", webinar.thumbnail);
      } else {
        formData.append("thumbnail", thumbnail, thumbnail.name);
      }
      formData.append("status", true);
      axios
        .post("http://34.101.97.232:5000/api/webinars", formData)
        .then(() => {
          router.go({
            name: "webinar",
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

    function destroy(id, index) {
      axios
        .delete(`http://34.101.97.232:5000/api/webinars/${id}`)
        .then(() => {
          webinars.value.data.splice(index, 1);
          router.go({
            name: "webinar",
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    function getId(id) {
      idWebinar.value = id;
    }

    return {
      webinar,
      validation,
      router,
      store,
      onThumbnailSelected,
      onModulSelected,
      thumbnail,
      modul,
      webinars,
      destroy,
      getId,
      idWebinar,
    };
  },
};
</script>
