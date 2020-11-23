<template>
    <p>
        <button @click="test()">test get</button>
    </p>
    <p>
        <input class="file" name="file" type="file" @change="update" />
    </p>
</template>

<script>
import Axios from "axios";
export default {
    name: "App",
    components: {},
    methods: {
        test() {
            Axios.get("http://localhost:3001/test").then((response) => {
                console.log(response.data);
            });
        },
        update(e) {
            let file = e.target.files[0];
            let param = new FormData();
            param.append("myfile", file);
            console.log(param.get("file"));
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data;charset=UTF-8",
                },
            };
            Axios.post("http://localhost:3001/upload", param, config).then(
                (response) => {
                    console.log(response.data);
                }
            );
        },
    },
};
</script>