<template>
  <ApolloQuery
    :query="
      (gql) => gql`
        query($slug: String!) {
          post(slug: $slug) {
            id
            slug
            status
            title
            html
            markdown
            updateAt
            image
            excerpt
            commentConnection {
              comments {
                id
                nickname
                email
                content
                createAt
              }
            }
          }
        }
      `
    "
    :variables="{
      slug: this.$route.params.slug,
    }"
  >
    <template v-slot="{ result: { loading, error, data }, query }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">
        <header style="padding: 18px;background: #f9f9f9;">
          <h1 style="font-weight:300;color: black">一片荒野</h1>
          <span style="color: #a0a0a0;">还未被开垦</span>
        </header>
        <Card
          dis-hover
          style="margin: 20px;background: smokewhite;"
          class="golb-post-breadcrumb"
        >
          <Breadcrumb>
            <BreadcrumbItem to="/">
              <Icon type="ios-home-outline" />
              首页
            </BreadcrumbItem>
            <BreadcrumbItem>{{ $route.params.slug }}</BreadcrumbItem>
            <BreadcrumbItem></BreadcrumbItem>
          </Breadcrumb>
        </Card>
        <Card dis-hover style="margin: 0px 20px;background: smokewhite;">
          <article class="golb-page-html">这里还没有内容哦</article>
        </Card>
      </div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <header style="padding: 18px;background: #f9f9f9;">
          <h1 style="font-weight:300;color: black">{{ data.post.title }}</h1>
          <span style="color: #a0a0a0;">勿為塵所欺</span>
        </header>
        <Card
          dis-hover
          style="margin: 20px;background: smokewhite;"
          class="golb-post-breadcrumb"
        >
          <Breadcrumb>
            <BreadcrumbItem to="/">
              <Icon type="ios-home-outline" />
              首页
            </BreadcrumbItem>
            <BreadcrumbItem>文章</BreadcrumbItem>
            <BreadcrumbItem></BreadcrumbItem>
          </Breadcrumb>
        </Card>
        <div style="text-align:center;padding: 0px 20px;width:100%;">
          <img style="width:100%;display:block;" :src="data.post.image" />
        </div>
        <Card dis-hover style="margin: 0px 20px;background: smokewhite;">
          <article class="golb-post-html" v-html="data.post.html"></article>
        </Card>
        <Card
          v-if="false"
          dis-hover
          style="margin: 20px;background: smokewhite;"
        >
          <Button shape="circle">Prev</Button>
          <Button shape="circle">Next</Button>
        </Card>

        <Comments
          :comments="data.post.commentConnection.comments"
          :postID="data.post.id"
          @refetch="query.refetch()"
        />
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>
import Comments from "@/components/Comments";

export default {
  name: "Post",
  components: {
    Comments,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less">
.golb-post-breadcrumb {
  .ivu-card-body {
    padding: 8px 16px;
  }
}
.golb-post-html {
  overflow: hidden;
  h1,
  h2,
  h3 {
    border-bottom: 1px solid #ccb8c5;
    margin: 16px 0px;
  }
  ol {
    padding-left: 16px;
  }
  pre {
    code {
      display: block;
      overflow-x: scroll;
    }
  }
}
</style>
