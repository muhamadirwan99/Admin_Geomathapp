<template>
  <div class="content">
    <div class="row">
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
                  <i class="nc-icon nc-bulb-63 text-success"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Tips And Trick</p>
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
      <div class="col-lg-3 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-body">
            <div class="row">
              <div class="col-5 col-md-4">
                <div class="icon-big text-center icon-warning">
                  <i class="nc-icon nc-bullet-list-67 text-danger"></i>
                </div>
              </div>
              <div class="col-7 col-md-8">
                <div class="numbers">
                  <p class="card-category">Webinar</p>
                  <p class="card-title">{{ webinars.length }}</p>
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
            <!-- <p class="card-category">24 Hours performance</p> -->
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table">
                <thead class="text-primary">
                  <th>Nama</th>

                  <th>Thumbnail</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ videoName }}</td>
                    <td>
                      <img
                        :src="'http://34.128.78.90:5000/' + videoThumbnail"
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
    <!-- <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Email Statistics</h5>
            <p class="card-category">Last Campaign Performance</p>
          </div>
          <div class="card-body">
            <canvas id="chartEmail"></canvas>
          </div>
          <div class="card-footer">
            <div class="legend">
              <i class="fa fa-circle text-primary"></i> Opened
              <i class="fa fa-circle text-warning"></i> Read
              <i class="fa fa-circle text-danger"></i> Deleted
              <i class="fa fa-circle text-gray"></i> Unopened
            </div>
            <hr />
            <div class="stats">
              <i class="fa fa-calendar"></i> Number of emails sent
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card card-chart">
          <div class="card-header">
            <h5 class="card-title">NASDAQ: AAPL</h5>
            <p class="card-category">Line Chart with Points</p>
          </div>
          <div class="card-body">
            <canvas id="speedChart" width="400" height="100"></canvas>
          </div>
          <div class="card-footer">
            <div class="chart-legend">
              <i class="fa fa-circle text-info"></i> Tesla Model S
              <i class="fa fa-circle text-warning"></i> BMW 5 Series
            </div>
            <hr />
            <div class="card-stats">
              <i class="fa fa-check"></i> Data information certified
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const url = "http://34.128.78.90:5000/";
    let videos = ref([]);
    let tips = ref([]);
    let webinars = ref([]);
    let videoName = ref();
    let videoThumbnail = ref();

    onMounted(() => {
      // get data from api endpoint
      axios
        .get(url + "api/videos")
        .then((result) => {
          videos.value = result.data.data;
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
    };
  },
};
</script>
