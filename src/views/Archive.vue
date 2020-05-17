<template>
  <ApolloQuery
    :query="
      (gql) => gql`
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
      `
    "
    :variables="{
      page: 1,
      perPage: 100,
      paged: false,
    }"
  >
    <template v-slot="{ result: { loading, error, data } }">
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
          <h1 style="font-weight:300;color: black">123</h1>
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
        <Card dis-hover style="margin: 20px;background: smokewhite;">
          <Timeline>
            <TimelineItem
              :color="
                '#' +
                  Math.random()
                    .toString(16)
                    .substr(2, 6)
              "
            >
              <p class="time">5月</p>
              <p class="content">
                <List>
                  <ListItem v-for="n in data.allPosts.posts" :key="n.id">
                    <ListItemMeta
                      avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                      :title="n.title"
                    />
                  </ListItem>
                </List>
              </p>
            </TimelineItem>
            <TimelineItem>
              <p class="time">4月</p>
              <p class="content">
                <Timeline>
                  <TimelineItem
                    :color="
                      '#' +
                        Math.random()
                          .toString(16)
                          .substr(2, 6)
                    "
                  >
                    123
                  </TimelineItem>
                  <TimelineItem
                    :color="
                      '#' +
                        Math.random()
                          .toString(16)
                          .substr(2, 6)
                    "
                  >
                    123
                  </TimelineItem>
                  <TimelineItem
                    :color="
                      '#' +
                        Math.random()
                          .toString(16)
                          .substr(2, 6)
                    "
                  >
                    123
                  </TimelineItem>
                </Timeline>
              </p>
            </TimelineItem>
          </Timeline>
        </Card>

        <Card dis-hover style="margin: 20px;background: smokewhite;">
          评论区
          <div ref="gitalk" class="gitalk-container"></div>
        </Card>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script>
export default {};
</script>

<style></style>
