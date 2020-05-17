<template>
  <Card dis-hover style="margin-top:10px;background: smokewhite;">
    <h3>发表评论<Icon type="ios-create-outline" /></h3>
    <Form
      ref="commentForm"
      :model="comment"
      :rules="rules"
      inline
      :show-message="false"
    >
      <div v-if="false">
        <Icon type="ios-attach" size="20" />
        <cite>
          {{ replyTo.content }}
        </cite>
      </div>
      <FormItem
        label="评论"
        prop="content"
        style="width:100%;margin:0px;"
        required
      >
        <i-input
          type="textarea"
          v-model="comment.content"
          :autosize="{ minRows: 3 }"
          placeholder="Enter something..."
        >
          <Icon type="ios-person-outline" slot="prefix"></Icon>
        </i-input>
      </FormItem>
      <br />
      <FormItem label="私密评论" style="width:100%;margin:0px;">
        <i-switch size="small" v-model="comment.private">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="昵称" prop="nickname" required>
        <i-input type="text" placeholder="nickname" v-model="comment.nickname">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem label="邮箱" prop="email" required>
        <i-input type="email" placeholder="email" v-model="comment.email">
          <Icon type="ios-mail-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem label="域名" prop="domain">
        <i-input type="url" placeholder="domain" v-model="comment.domain">
          <Icon type="ios-link-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <br />
      <FormItem>
        <Button type="primary" @click="handleSubmit">
          Comment
        </Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
const createCommentGql = require("@/graphql/createComment.gql");

export default {
  name: "CommentForm",
  props: {
    postID: {
      type: String,
      default: "0",
    },
    replyTo: {
      type: Object,
    },
    refetch: {
      type: Function,
    },
  },
  data() {
    return {
      comment: {
        nickname: "",
        email: "",
        target: JSON.stringify(this.replyTo) === "{}" ? "post" : "comment",
        content: "",
        domain: "",
        // ip: "", // no need to get ip, it can be done in server side
        // agent: navigator.userAgent, // no need to get agent, it can be done in server side
        status: "",
        postID: this.postID,
        parentID: JSON.stringify(this.replyTo) === "{}" ? "0" : this.replyTo.id,
        private: false,
      },
      rules: {
        content: [
          {
            required: true,
            message: "Please fill in the content.",
          },
        ],
        nickname: [
          {
            required: true,
            message: "Please fill in the nickname.",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            type: "email",
            min: 1,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.commentForm.validate((valid) => {
        if (valid) {
          this.createComment();
        } else {
          this.$Message.warning({
            background: true,
            content: "请填写完整必填的信息哦",
          });
        }
      });
    },
    createComment() {
      this.$apollo
        .mutate({
          mutation: createCommentGql,
          variables: {
            ...this.comment,
          },
        })
        .then(() => {
          this.$Message.success({
            background: true,
            content: "评论成功",
          });
          this.$emit("refetch");
          this.$refs.commentForm.resetFields();
        })
        .catch((error) => {
          console.error(error);
          this.$Message.error({
            content: "评论失败,请稍后重试",
          });
        });
    },
  },
};
</script>

<style></style>
