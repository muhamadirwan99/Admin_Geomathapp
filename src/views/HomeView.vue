<template>
  <div class="content">
    <div class="row justify-content-md-left">
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-button-play text-warning"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Video</p>
                  <p class="card-title">{{ videos.length }}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr />
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-single-02 text-success"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">User</p>
                  <p class="card-title">{{ tips.length }}</p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <hr />
          </div>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Video terbaru</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead class="text-primary">
                  <th>Judul</th>
                  <th>Deskripsi</th>
                  <th>Thumbnail</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ videoName }}</td>
                    <td>{{ desc }}</td>
                    <td>
                      <img
                        :src="videoThumbnail"
                        width="300"
                        class="img-thumbnail"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">User</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead class="text-primary">
                  <th>Nama</th>
                  <th>NIS</th> 
                  <th>Kelas</th>
                  <th>Poin</th>
                  
                </thead>
                <tbody>
                  <tr>
                    <td>{{ webinarName }}</td>
                    <td>
                      <img
                        :src="'http://34.101.97.232:5000/' + webinarThumbnail"
                        width="300"
                        class="img-thumbnail"
                      />
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
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const url = "http://34.101.97.232:5000/";
    let videos = ref([]);
    let desc = ref([])
    let tips = ref([]);
    let webinars = ref([]);
    let videoName = ref();
    let videoThumbnail = ref();
    let webinarName = ref();
    let webinarThumbnail = ref();

    onMounted(() => {
      // get data from api endpoint
      axios
        .get(url + "api/videos")
        .then((result) => {
          videos.value = result.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });

      axios
        .get(url + "api/videos/update/recent")
        .then((result) => {
          videoName.value = result.data.data[0].name;
          videoThumbnail.value = result.data.data[0].thumbnail;
        })
        .catch((err) => {
          console.log(err.response);
        });

      axios
        .get(url + "api/tips")
        .then((result) => {
          tips.value = result.data.data;
        })
        .catch((err) => {
          console.log(err.response);
        });

      axios
        .get(url + "api/webinars")
        .then((result) => {
          webinars.value = result.data.data;
          webinarName.value = result.data.data[0].name;
          webinarThumbnail.value = result.data.data[0].thumbnail;
        })
        .catch((err) => {
          console.log(err.response);
        });

      axios
        .get(url + "api/webinars/update/recent")
        .then((result) => {
          webinarName.value = result.data.data[0].name;
          webinarThumbnail.value = result.data.data[0].thumbnail;
        })
        .catch((err) => {
          console.log(err.response);
        });
    });

    return {
      videos,
      tips,
      webinars,
      videoName,
      videoThumbnail,
      webinarName,
      webinarThumbnail,
    };
  },
};
</script>
