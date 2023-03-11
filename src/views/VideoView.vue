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
                <label for="" class="form-label">Title</label>
                <input type="text" class="form-control" v-model="video.name" />
                <div v-if="validation.name" class="text-danger">
                  {{ validation.name }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Deskripsi</label>
                <textarea class="form-control" v-model="video.desc"></textarea>
                <div v-if="validation.desc" class="text-danger">
                  {{ validation.desc }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Link Video Youtube</label>
                <input type="url" class="form-control" v-model="video.idYt" />
                <div v-if="validation.idYt" class="text-danger">
                  {{ validation.idYt }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Modul</label><br />
                <input
                  id="modul"
                  @change="onModulSelected"
                  type="file"
                  class="form-control"
                  accept=".pdf, .doc, .docx"
                />
              </div>
              <div v-if="validation.file" class="text-danger">
                {{ validation.file }}
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
                    <th>Link Video Youtube</th>
                    <th>Thumbnail</th>
                    <th>Modul</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr v-for="(video, index) in videos.data" :key="index">
                      <td>{{ video.name }}</td>
                      <td>{{ video.desc }}</td>
                      <td>{{ video.idYt }}</td>
                      <td>
                        <img
                          :src="video.thumbnail"
                          width="300"
                          class="img-thumbnail"
                        />
                      </td>
                      <td>{{ video.modul.replace("public/moduls/", "") }}</td>
                      <td>
                        <div class="btn-group">
                          <router-link
                            :to="{
                              name: 'editvideo',
                              params: { id: video.id },
                            }"
                            class="btn btn-sm btn-outline-info"
                            >Edit</router-link
                          >
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-danger"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            @click="getId(video.id)"
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
                                    @click.prevent="destroy(idVideo, index)"
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
    let modul = ref(null);
    let idVideo = ref(null);
    const validation = ref([]);
    const router = useRouter();

    const url = "http://34.101.97.232:5000/";

    // data binding
    const video = reactive({
      name: "",
      idYt: "",
      desc: "",
      thumbnail: "",
      modul: "",
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
      var idyt = "";
      if (validURL(video.idYt)) {
        var url = new URL(video.idYt);
        idyt = url.searchParams.get("v");
      }

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
        .post("http://34.101.97.232:5000/api/videos", formData)
        .then(() => {
          router.go({
            name: "video",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    function validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }

    function onModulSelected(event) {
      modul = event.target.files[0];
    }

    function destroy(id, index) {
      axios
        .delete(`http://34.101.97.232:5000/api/videos/${id}`)
        .then(() => {
          videos.value.data.splice(index, 1);
          router.go({
            name: "video",
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    function getId(id) {
      idVideo.value = id;
    }

    return {
      video,
      validation,
      router,
      store,
      onModulSelected,
      modul,
      videos,
      destroy,
      getId,
      idVideo,
    };
  },
};
</script>
