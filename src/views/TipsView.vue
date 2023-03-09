<template>
  <div class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Add Tips And Trick</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="store()">
              <div class="mb-3">
                <label for="" class="form-label">Kategori</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  v-model="tips.category"
                >
                  <option value="Disleksia">Disleksia</option>
                  <option value="Pembelajaran">Pembelajaran</option>
                  <option value="Peningkatan Minat">Peningkatan Minat</option>
                </select>
                <div v-if="validation.category" class="text-danger">
                  {{ validation.category }}
                </div>
              </div>
              <div class="div mb-3">
                <label for="" class="form-label">Judul</label>
                <input type="text" class="form-control" v-model="tips.name" />
                <div v-if="validation.name" class="text-danger">
                  {{ validation.name }}
                </div>
              </div>
              <div class="mb-3">
                <label for="" class="form-label">Deskripsi</label>
                <textarea
                  type="text"
                  class="form-control"
                  v-model="tips.desc"
                ></textarea>
                <div v-if="validation.desc" class="text-danger">
                  {{ validation.desc }}
                </div>
              </div>
              <button class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">List Tips</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead class="text-primary">
                    <th>Kategori</th>
                    <th>Judul</th>
                    <th>Deskripsi</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr v-for="(tips, index) in manyTips.data" :key="index">
                      <td>{{ tips.category }}</td>
                      <td>{{ tips.name }}</td>
                      <td>{{ tips.desc }}</td>
                      <td>
                        <div class="btn-group">
                          <router-link
                            :to="{ name: 'edittips', params: { id: tips.id } }"
                            class="btn btn-sm btn-outline-info"
                            >Edit</router-link
                          >
                          <button
                            type="button"
                            class="btn btn-sm btn-outline-danger"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            @click="getId(tips.id)"
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
                                    @click.prevent="destroy(idTips, index)"
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
    let manyTips = ref([]);
    let idTips = ref([]);
    const validation = ref([]);
    const router = useRouter();

    const url = "http://34.101.97.232:5000/";

    // data binding
    const tips = reactive({
      category: "",
      name: "",
      desc: "",
    });

    onMounted(() => {
      // get data from api endpoint
      axios
        .get(url + "api/tips")
        .then((result) => {
          manyTips.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    function store() {
      const formData = new FormData();
      formData.append("category", tips.category);
      formData.append("name", tips.name);
      formData.append("desc", tips.desc);

      axios
        .post("http://34.101.97.232:5000/api/tips", formData)
        .then(() => {
          router.go({
            name: "tips",
          });
        })
        .catch((err) => {
          validation.value = err.response.data;
        });
    }

    function destroy(id, index) {
      axios
        .delete(`http://34.101.97.232:5000/api/tips/${id}`)
        .then(() => {
          manyTips.value.data.splice(index, 1);
          router.go({
            name: "tips",
          });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    function getId(id) {
      idTips.value = id;
    }

    return {
      tips,
      validation,
      router,
      store,
      manyTips,
      destroy,
      getId,
      idTips,
    };
  },
};
</script>
