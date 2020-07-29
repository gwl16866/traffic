<template>
    <div class="pdf">
        <pdf ref="pdf" :src="pdfUrl"></pdf>
    </div>
</template>
<script>
import pdf from 'vue-pdf';
export default {
    name: 'Pdf',
    components: {
        pdf
    },
    data() {
        return {
            pdfUrl: 'src/components/page/汤豪.pdf'
        };
    }
};
</script>