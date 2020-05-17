<template>
  <ListItem @blur="onBlur">
    <ListItemMeta :title="comment.nickname">
      <Avatar
        slot="avatar"
        shape="square"
        size="large"
        :style="{
          background: randomRgb,
        }"
        icon="ios-person"
      />
      <Time slot="description" :time="comment.createAt * 1000" />
    </ListItemMeta>

    <p style="background: #f9f9f9;line-height:25px;">
      {{ comment.content }}
      <Tooltip
        placement="top"
        content="reply"
        :delay="400"
        style="float:right;"
      >
        <Button @click="reply()" size="small" icon="ios-quote-outline"></Button>
      </Tooltip>
    </p>

    <ApolloQuery
      :query="require('@/graphql/queryReply.gql')"
      :variables="{ parentID: comment.id }"
    >
      <template v-slot="{ result: { loading, error, data }, query }">
        <div>
          <CommentForm
            :style="{ background: randomRgba }"
            v-if="isReply"
            :replyTo="comment"
            :postID="postID"
            @refetch="query.refetch()"
          />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo" style="padding-left:40px;">
          <List item-layout="vertical" class="golb-post-comment">
            <CommentsListItem
              v-for="item in data.allComments.comments"
              :key="item.id"
              :comment="item"
              :postID="postID"
              @refetch="refetch()"
            >
            </CommentsListItem>
          </List>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </ListItem>
</template>

<script>
import CommentForm from "@/components/CommentForm";
export default {
  name: "CommentsListItem",
  props: {
    comment: {
      type: Object,
      default: () => {
        return { nickname: "", createAt: "", content: "" };
      },
    },
    postID: {
      type: String,
    },
  },

  components: {
    CommentForm,
  },
  data() {
    return {
      isReply: false,
      randomRgb: "",
      randomRgba: "",
    };
  },
  mounted() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var a = 0.05;
    this.randomRgb = "rgb(" + r + ", " + g + ", " + b + ")";
    this.randomRgba = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  },
  methods: {
    reply() {
      this.isReply = !this.isReply;
    },
    refetch() {
      this.$emit("refetch");
    },
    onBlur() {
      console.log("onBlur");
      this.isReply = false;
    },
  },
  computed: {},
};
</script>

<style></style>
