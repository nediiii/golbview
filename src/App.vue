<template>
  <Row type="flex" justify="center" style="background: #f9f9f9;">
    <i-col
      :xs="24"
      :sm="24"
      :md="24"
      :lg="20"
      :xl="18"
      :xxl="16"
      style="margin:auto;box-shadow: 0 1px 4px 1px rgba(0,0,0,.05);"
    >
      <Layout>
        <Header
          :style="{
            background: '#f9f9f9',
            padding: '0px',
            position: 'sticky',
            top: '0px',
            zIndex: '999',
          }"
          style="box-shadow: 0 1px 4px 1px rgba(0,0,0,.05);"
        >
          <div>
            <Button style="width:200px;color: black" type="text" ghost to="/">
              <img
                style="height: 32px;"
                :src="require('@/assets/site.png')"
                alt=""
              />
            </Button>

            <Input
              search
              @on-search="onSearch"
              suffix="ios-search"
              placeholder="Search the keyword"
              style="width: auto;"
            />
          </div>
        </Header>

        <Layout>
          <Sider
            v-model="isLeftSiderCollapsed"
            breakpoint="sm"
            collapsible
            hide-trigger
            :style="{
              position: 'fixed',
              height: '100vh',
              overflow: 'auto',
              background: '#f9f9f9',
            }"
          >
            <Card>
              <div style="text-align:center">
                <Avatar :src="require('@/assets/logo.png')" size="128" />
                <h3
                  style="font-weight: lighter;font-size: small;margin-top: 10px;"
                >
                  期待美好的事情发生
                </h3>
              </div>
            </Card>
            <hr style="border: whitesmoke;" />
            <Menu
              accordion
              active-name="1"
              style="width:100%"
              class="golb-app-sider-left"
            >
              <MenuGroup title="导航">
                <MenuItem name="1" to="/">
                  <Icon type="ios-home-outline" />
                  首页
                </MenuItem>
                <MenuItem name="2" to="/archive">
                  <Icon type="ios-archive-outline" />
                  归档
                </MenuItem>
                <MenuItem name="3" to="/about">
                  <Icon type="ios-at-outline" />
                  关于
                </MenuItem>
                <MenuItem name="4" to="/friend">
                  <Icon type="ios-people-outline" />
                  朋友
                </MenuItem>
                <MenuItem name="5" to="/comment">
                  <Icon type="ios-create-outline" />
                  留言
                </MenuItem>
              </MenuGroup>
              <MenuGroup title="更多">
                <Submenu name="s2">
                  <template slot="title">
                    <Icon type="ios-filing" />
                    分类
                  </template>
                  <MenuItem name="s2-1" to="/note">笔记</MenuItem>
                  <MenuItem name="s2-2" to="idea">随想</MenuItem>
                </Submenu>
                <Submenu name="s3">
                  <template slot="title">
                    <Icon type="ios-filing" />
                    页面
                  </template>
                  <MenuItem name="s3-1" to="/about">关于我</MenuItem>
                  <MenuItem name="s3-2" to="/sponsor">打赏我</MenuItem>
                </Submenu>
                <Submenu name="s4">
                  <template slot="title">
                    <Icon type="ios-filing" />
                    友链
                  </template>
                  <MenuItem name="s4-1" to="/friend/A">友達A</MenuItem>
                  <MenuItem name="s4-2" to="/friend/B">友達B</MenuItem>
                </Submenu>
              </MenuGroup>
            </Menu>
          </Sider>
          <Content
            style="min-height:calc(100vh - 64px);background: #f1f3f4"
            :style="{ marginLeft: isLeftSiderCollapsed ? '0px' : '200px' }"
          >
            <router-view />
          </Content>
          <Sider
            v-model="isRightSiderCollapsed"
            breakpoint="md"
            collapsible
            hide-trigger
            :style="{
              background: '#f9f9f9',
            }"
          >
            <div>
              <Tabs size="small">
                <TabPane label="" icon="ios-stats">
                  <Card>
                    <p slot="title">
                      <Icon type="ios-flame" />
                      热门文章
                    </p>
                    <List>
                      <ListItem v-for="n in [1, 2, 3]" :key="n">
                        <ListItemMeta
                          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="This is title"
                          description="This is description, this is description."
                        />
                      </ListItem>
                    </List>
                  </Card>
                </TabPane>
                <TabPane label="" icon="ios-chatboxes-outline">
                  <Card>
                    <p slot="title">
                      <Icon type="ios-flame" />
                      最新评论
                    </p>
                    <List>
                      <ListItem v-for="n in [1, 2, 3]" :key="n">
                        <ListItemMeta
                          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="This is title"
                          description="This is description, this is description."
                        />
                      </ListItem>
                    </List>
                  </Card>
                </TabPane>
                <TabPane label="" icon="ios-flower-outline">
                  <Card>
                    <p slot="title">
                      <Icon type="ios-flame" />
                      随机文章
                    </p>
                    <List>
                      <ListItem v-for="n in [1, 2, 3]" :key="n">
                        <ListItemMeta
                          avatar="https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar"
                          title="This is title"
                          description="This is description, this is description."
                        />
                      </ListItem>
                    </List>
                  </Card>
                </TabPane>
              </Tabs>
              <Card :padding="0">
                <p slot="title">
                  <Icon type="ios-sunny-outline" />
                  博客信息
                </p>
                <CellGroup>
                  <ApolloQuery
                    :query="
                      (gql) => gql`
                        query {
                          allPosts {
                            pageInfo {
                              total
                            }
                          }
                        }
                      `
                    "
                    v-slot="{ result: { data } }"
                  >
                    <Cell
                      v-if="data"
                      title="文章总数"
                      :extra="data.allPosts.pageInfo.total + ''"
                    />

                    <Cell v-if="data" title="最近更新">
                      <Time slot="extra" :time="time3" :interval="1" />
                    </Cell>
                  </ApolloQuery>
                </CellGroup>
              </Card>
              <Card>
                <p slot="title">
                  <Icon type="ios-pricetags-outline" />
                  标签云
                </p>
                <ApolloQuery
                  :query="
                    (gql) => gql`
                      query {
                        allTags {
                          tags {
                            id
                            name
                            description
                          }
                        }
                      }
                    `
                  "
                  v-slot="{ result: { data } }"
                >
                  <div v-if="data">
                    <Tooltip
                      placement="top"
                      :content="t.description"
                      :delay="1000"
                      v-for="t in data.allTags.tags"
                      :key="t.id"
                    >
                      <Tag
                        :color="
                          '#' +
                            Math.random()
                              .toString(16)
                              .substr(2, 6)
                        "
                      >
                        {{ t.name }}
                      </Tag>
                    </Tooltip>
                  </div>
                </ApolloQuery>
              </Card>
            </div>
          </Sider>
        </Layout>
      </Layout>
      <Modal v-model="searchResultModel" title="Search Result" width="75">
        <List>
          <ListItem v-for="item in searchResult.items" :key="item.cacheId">
            <ListItemMeta :description="item.htmlSnippet">
              <template slot="title">
                <a :href="item.link" target="_blank">{{ item.title }}</a>
              </template>
            </ListItemMeta>
          </ListItem>
        </List>
      </Modal>
      <BackTop></BackTop>
    </i-col>
  </Row>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      searchResult: {},
      searchResultModel: false,
      isRightSiderCollapsed: false,
      isLeftSiderCollapsed: false,
      time3: new Date(),
    };
  },

  methods: {
    onSearch(value) {
      // console.log(value);
      let ParasCx = "017401005298521109186:smtaeuwwv1w";
      let ParasKey = "AIzaSyBPOQ6e9BjLbdMFGtpy3RCMkzYe_6m8yE4";
      fetch(
        `https://www.googleapis.com/customsearch/v1/siterestrict?key=${ParasKey}&cx=${ParasCx}&q=${value}`
      )
        .then((response) => {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
          // Examine the text in the response
          response.json().then((data) => {
            this.searchResultModel = true;
            this.searchResult = data;
            console.log(data);
          });
        })
        .catch((err) => {
          this.$Message.error({
            content: "搜索失败,请确保您能正常访问国际互联网",
          });
          console.log("Fetch Error :-S", err);
        });
    },
  },
};
</script>

<style lang="less">
html,
body {
  scroll-behavior: smooth;
}
*:focus {
  outline: none;
}
@import "./app.less";
</style>
