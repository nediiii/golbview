<template>
  <div>
    <header style="padding: 18px;background: #f9f9f9;">
      <h1 style="font-weight:300;color: black">去去行采芝</h1>
      <span style="color: #a0a0a0;">勿為塵所欺</span>
    </header>
    <div style="padding: 18px;">
      <List item-layout="vertical">
        <Card v-for="post in posts" :key="post.id" style="margin-bottom: 18px;">
          <router-link slot="title" :to="'/post/' + post.slug">
            {{ post.title }}</router-link
          >
          <ListItem style="padding: 0px;">
            <ListItemMeta
              :avatar="require('@/assets/logo.png')"
              :title="post.title"
              :description="post.excerpt"
            />
            {{ post.excerpt }}
            <template slot="action">
              <li><Icon type="ios-star-outline" /> 123</li>
              <li><Icon type="ios-thumbs-up-outline" /> 234</li>
              <li><Icon type="ios-chatbubbles-outline" /> 345</li>
            </template>
            <template slot="extra">
              <img
                :src="
                  post.image.length > 0
                    ? post.image
                    : 'https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large'
                "
                style="width: 280px"
              />
            </template>
          </ListItem>
        </Card>
      </List>
    </div>

    <Row type="flex" justify="center" style="margin-bottom:18px;">
      <Page
        :total="total"
        :current="currentPage"
        :page-size="perPage"
        :page-size-opts="[10, 12, 15, 20, 30]"
        @on-change="onChange"
        show-elevator
      />
    </Row>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      currentPage: 1,
      perPage: 5,
      total: 0,
      posts: [{ title: "", image: "" }],
      allPosts: { posts: [{ id: 0, image: "" }] },
    };
  },

  methods: {
    onChange(currentPage) {
      this.currentPage = currentPage;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },

  apollo: {
    allPosts: {
      query: gql`
        query($page: Int, $perPage: Int, $paged: Boolean) {
          allPosts(page: $page, perPage: $perPage, paged: $paged) {
            pageInfo {
              currentPage
              perPage
              hasNextPage
              hasPreviousPage
              total
            }
            posts {
              id
              slug
              status
              title
              html
              markdown
              updateAt
              image
              excerpt
            }
          }
        }
      `,
      variables() {
        return {
          page: this.currentPage,
          perPage: this.perPage,
          paged: false,
        };
      },
      result({ data }) {
        this.total = data.allPosts.pageInfo.total;
        this.perPage = data.allPosts.pageInfo.perPage;
        this.currentPage = data.allPosts.pageInfo.currentPage;
        this.posts = data.allPosts.posts;
      },
    },
  },
};
</script>
