<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="div col-8">
        <router-link
          :to="{ name: 'create' }"
          class="btn btn-primary btn-sm rounded shadow mb-3"
          >Add</router-link
        >
        <div class="card rounded shadow">
          <div class="card-header">Video Liste</div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Deskripsi</th>
                  <th>ID Video Youtube</th>
                  <th>Thumbnail</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(video, index) in videos.data" :key="index">
                  <td>{{ video.name }}</td>
                  <td>{{ video.desc }}</td>
                  <td>{{ video.idYt }}</td>
                  <td>
                    <img
                      :src="'http://localhost:5000/' + video.thumbnail"
                      class="img-fluid"
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
                        class="btn btn-sm btn-outline-danger"
                        @click.prevent="destroy(video.id, index)"
                      >
                        Delete
                      </button>
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
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  setup() {
    // reactive state
    let videos = ref([]);
    const url = "http://localhost:5000/";

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
      videos,
      destroy,
    };
  },
};
</script>
