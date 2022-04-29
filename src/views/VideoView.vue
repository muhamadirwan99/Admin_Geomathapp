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
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">List Video</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead class="text-primary">
                    <th>Nama</th>
                    <th>Deskripsi</th>
                    <th>ID Video Youtube</th>
                    <th>Thumbnail</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr v-for="(video, index) in videos.data" :key="index">
                      <td>{{ video.name }}</td>
                      <td>{{ video.desc }}</td>
                      <td>{{ video.idYt }}</td>
                      <td>
                        <img
                          :src="'http://localhost:5000/' + video.thumbnail"
                          width="300"
                          class="img-thumbnail"
                        />
                      </td>
                      <td>
                        <div class="btn-group">
                          <router-link
                            :to="{ name: 'edit', params: { id: video.id } }"
                            class="btn btn-sm btn-outline-info"
                            >Edit</router-link
                          >
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-danger"
                            data-toggle="modal"
                            data-target="#exampleModal"
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
                                    Delete Video
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
                                    @click.prevent="destroy(video.id, index)"
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
    let videos = ref([]);
    const url = "http://localhost:5000/";
    let file = ref(null);
    const validation = ref([]);
    const router = useRouter();

    // data binding
    const video = reactive({
      name: "",
      idYt: "",
      desc: "",
      thumbnail: "",
    });

    onMounted(() => {
      // get data from api endpoint
      axios
        .get(url + "api/videos")
        .then((result) => {
          videos.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    function store() {
      const formData = new FormData();
      formData.append("name", video.name);
      formData.append("idYt", video.idYt);
      formData.append("desc", video.desc);
      formData.append("thumbnail", file, file.name);
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

    function destroy(id, index) {
      axios
        .delete(`http://127.0.0.1:5000/api/videos/${id}`)
        .then(() => {
          videos.value.data.splice(index, 1);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    return {
      video,
      validation,
      router,
      store,
      onFileSelected,
      file,
      videos,
      destroy,
    };
  },
};
</script>
