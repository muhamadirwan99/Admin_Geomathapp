<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Add Kisah Inspiratif</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store()">
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
                <label for="" class="form-label">Thumbnail</label><br />
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
              <h4 class="card-title">List Kisah Inspiratif</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead class="text-primary">
                    <th>Judul</th>
                    <th>Sumber</th>
                    <th>Link Artikel</th>
                    <th>Thumbnail</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr v-for="(kisah, index) in kisahs.data" :key="index">
                      <td>{{ kisah.name }}</td>
                      <td>{{ kisah.sumber }}</td>
                      <td>
                        <a v-bind:href="kisah.link">Link artikel</a>
                      </td>
                      <td>
                        <img
                          :src="'http://34.101.97.232:5000/' + kisah.thumbnail"
                          width="300"
                          class="img-thumbnail"
                        />
                      </td>
                      <td>
                        <div class="btn-group">
                          <router-link
                            :to="{
                              name: 'editkisah',
                              params: { id: kisah.id },
                            }"
                            class="btn btn-sm btn-outline-info"
                            >Edit</router-link
                          >
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-danger"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            @click="getId(kisah.id)"
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
                                    Delete Kisah Inspiratif
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
                                    @click.prevent="destroy(idKisah, index)"
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
    let kisahs = ref([]);
    let modul = ref(null);
    let thumbnail = ref(null);
    let idKisah = ref(null);
    const validation = ref([]);
    const router = useRouter();

    const url = "http://34.101.97.232:5000/";

    // data binding
    const kisah = reactive({
      name: "",
      sumber: "",
      link: "",
      thumbnail: "",
    });

    onMounted(() => {
      // get data from api endpoint
      axios
        .get(url + "api/kisah")
        .then((result) => {
          kisahs.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    function store() {
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
        .post("http://34.101.97.232:5000/api/kisah", formData)
        .then(() => {
          router.go({
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

    function destroy(id, index) {
      axios
        .delete(`http://34.101.97.232:5000/api/kisah/${id}`)
        .then(() => {
          kisahs.value.data.splice(index, 1);
          router.go({
            name: "kisah",
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    function getId(id) {
      idKisah.value = id;
    }

    return {
      kisah,
      validation,
      router,
      store,
      onThumbnailSelected,
      modul,
      kisahs,
      destroy,
      getId,
      idKisah,
    };
  },
};
</script>
