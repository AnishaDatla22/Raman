axios.this.state.method(this.state.url, JSON.stringify(this.state.data),
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
