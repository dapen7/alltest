<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <input
        class="file"
        name="file"
        type="file"
        @change="update"/>
</template>

<script>
import Axios from 'axios';
export default {
    name: "App",
    components: {
    },
    methods: {
        update(e) {

            Axios.get("http://localhost:3001/test").then((response) => {
                console.log(response.data);
            });


            let file = e.target.files[0];
            let param = new FormData();
            param.append("myfile", file);
            console.log(param.get("file"));
            let config = {
                headers: { "Content-Type": "multipart/form-data;charset=UTF-8" },
            };
            Axios.post("http://localhost:3001/upload", param, config).then((response) => {
                console.log(response.data);
            });
        },
    },
};
</script>