<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <Button type="primary" @click="modal1 = true" style="margin-top:10px"
      >Click Here to Display Modal</Button
    >
    <Modal v-model="modal1" title="Add Revenue Group">
      <Form ref="formCustom" :model="formCustom">
        <FormItem label="Revenue Group Title" prop="revenueText">
          <Input
            ref="input-revenue"
            class="input-revenue"
            v-model="formCustom.revenueText"
          />
        </FormItem>
      </Form>

      <Form ref="formCustom2" :model="formCustom2">
        <FormItem prop="model2">
          <div>
            If

            <Select
              v-model="formCustom2.model2"
              placeholder="Select"
              style="margin-left: 10px;width:100px;margin-right: 10px"
            >
              <Option
                v-for="item in selectList2"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>

            of the below conditions are met
          </div>
        </FormItem>
      </Form>

      <Form ref="middleForm" :model="middleForm">
        <div
          v-for="(value1, index1) in middleForm.middle"
          :key="index1"
          v-if="value1.status == 1"
          ref="middle-section"
          class="middle-section"
        >
          <div class="rules-title">Rules {{ index1 + 1 }}</div>
          <div class="rules-container">
            <Select
              v-model="value1.model1"
              placeholder="Select"
              style="margin-left: 10px;width:100px;margin-right: 10px"
            >
              <Option
                v-for="item in selectList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
            -
            <Select
              v-model="value1.model3"
              placeholder="Select"
              style="margin-left: 10px;width:100px;margin-right: 10px"
            >
              <Option
                v-for="item in selectList3"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
            <div>
              <Input
                v-for="(value, index) in middleForm.middle[index1].rules"
                v-if="value.status == 1"
                :key="index"
                :ref="`rules-input`"
                class="rules-input"
                :class="`-${index}`"
                v-model="value.item"
                style="width: 200px"
              >
                <span class="percentage" slot="append"
                  ><a
                    v-if="index == middleForm.middle[index1].rules.length - 1"
                    @click="addRules(index1)"
                    ref="add-rule"
                    class="add-rule"
                    >add rule</a
                  >
                  <a
                    v-else
                    @click="deleteRules(index1, index)"
                    refs="delete-rule"
                    class="delete-rule"
                    >delete rule</a
                  >
                </span>
              </Input>
            </div>

            <div class="icon-button">
              <Button
                :disabled="index1 == middleForm.middle.length - 1"
                size="small"
                shape="circle"
                icon="md-remove"
                @click="deleteMiddle(index1)"
              ></Button>
              <Button
                @click="addMiddle()"
                v-if="
                  index1 == middleForm.middle.length - 1 && value1.status != 0
                "
                size="small"
                shape="circle"
                icon="md-add"
                style="margin-left:10px"
              ></Button>
            </div>
          </div>
        </div>
      </Form>
      <div class="numeric-field">
        <span>then revenue is</span>

        <div>
          <Input
            placeholder=" Number Only "
            class="input-number"
            ref="input-number"
            style="width: 150px"
            v-model="numeric"
          >
            <span class="percentage" slot="append">%</span>
          </Input>
        </div>
      </div>
      <div slot="footer">
        <Button class="confirm" size="large" @click="ok">Confirm</Button>
        <Button class="cancel" size="large" @click="cancel">Cancel</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import "iview/dist/styles/iview.css";

export default {
  data() {
    return {
      modal1: false,
      numeric: "",
      middleForm: {
        middle: [
          {
            rules: [
              {
                item: "",
                index: 0,
                status: 1,
              },
            ],
            item: [
              {
                index: 1,
                value: "",
              },
            ],
            model1: "aff_sub",
            model2: "all",
            model3: "is",
            status: 1,
          },
        ],
      },

      lastRules: 0,
      middleIndex: 1,
      formCustom: {
        revenueText: "",
      },

      selectList: [
        {
          value: "aff_sub",
          label: "aff_sub",
        },
        {
          value: "aff_sub2",
          label: "aff_sub2",
        },
        {
          value: "aff_sub3",
          label: "aff_sub3",
        },
      ],
      selectList2: [
        {
          value: "all",
          label: "All",
        },
        {
          value: "all2",
          label: "All2",
        },
        {
          value: "all3",
          label: "All3",
        },
      ],
      selectList3: [
        {
          value: "is",
          label: "is",
        },
        {
          value: "was",
          label: "was",
        },
        {
          value: "are",
          label: "are",
        },
      ],

      formCustom2: {
        model2: "all",
      },
    };
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  watch: {
    numeric(newVal) {
      let vm = this;
      if (newVal) {
        this.$refs["input-number"].$el.style.border = "";
        this.$refs["input-number"].$el.style.borderRadius = "";
        if (/^\d+$/.test(newVal)) {
          this.numeric = newVal;
        } else if (/^\d+\.\d*$/.test(newVal)) {
          this.numeric = newVal;
        } else if (/^[A-Za-z]+$/.test(newVal)) {
          setTimeout(function() {
            vm.numeric = "";
          }, 100);
        } else {
          this.numeric = "";
        }
      }
    },
    "formCustom.revenueText"(newVal) {
      if (newVal) {
        this.$refs["input-revenue"].$el.style.border = "";
        this.$refs["input-revenue"].$el.style.borderRadius = "";
      }
    },
  },

  methods: {
    ok() {
      if (this.formCustom.revenueText == "") {
        this.$Message.error("Please fill in the form");
        this.$refs["input-revenue"].$el.style.border = "1px solid red";
        this.$refs["input-revenue"].$el.style.borderRadius = "6px";
      } else if (this.numeric == "") {
        this.$Message.error("Please fill in the form");

        this.$refs["input-number"].$el.style.border = "1px solid red";
        this.$refs["input-number"].$el.style.borderRadius = "6px";
      } else {
        this.modal1 = false;
        this.$Message.success("Success confirm");
      }
    },
    cancel() {
      this.$Message.error("Cancel");
      this.$refs["formCustom"].resetFields();
      this.$refs["formCustom2"].resetFields();
      this.middleForm.middle = [];
      this.middleForm.middle.push({
        rules: [
          {
            item: "",
            index: 0,
            status: 1,
          },
        ],
        item: [
          {
            index: 1,
            value: "",
          },
        ],
        model1: "aff_sub",
        model2: "all",
        model3: "is",
        status: 1,
      });
      this.numeric = "";
      this.modal1 = false;
    },
    addRules(index) {
      this.middleForm.middle[index].rules.push({
        value: "",
        index: index,
        status: 1,
      });
      this.lastRules = this.middleForm.middle[index].rules.length - 1;
    },
    deleteRules(index, indexRules) {
      this.middleForm.middle[index].rules[indexRules].status = 0;
    },
    addMiddle() {
      this.middleIndex++;

      this.middleForm.middle.push({
        rules: [
          {
            item: "",
            index: 0,
            status: 1,
          },
        ],
        item: [
          {
            index: 1,
            value: "",
          },
        ],
        model1: "aff_sub",
        model2: "all",
        model3: "is",
        status: 1,
      });

      this.middleIndex = 0;
      this.lastRules = 0;
    },
    deleteMiddle(index) {
      this.middleForm.middle[index].status = 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}
.input-number input.ivu-input.ivu-input-default {
  border-right: none;
}

.ivu-input-group-append,
.ivu-input-group-prepend {
  background: #ffffff;
  color: #515a6e;
}
.ivu-input-group {
  margin-left: 10px;
}
.confirm {
  background: #e87617;
  color: white;
}
.cancel {
  background: gray;
  color: white;
}
.numeric-field {
  display: flex;
  align-items: center;
}
.middle-section {
  background: #ded5d5;

  padding: 10px 0 10px 0;
  margin: 10px 0 10px 0;
}
.ivu-modal {
  width: 620px !important;
}
.icon-button {
  margin-left: 60px;
}
.rules-container {
  display: flex;
  align-items: center;
}
.rules-title {
  margin-left: 15px;
  font-size: 14px;
  margin-bottom: 10px;
}
.add-rule {
  color: #0f8dbf;
}
.rules-input input.ivu-input.ivu-input-default {
  border-right: none;
}
.delete-rule {
  color: red;
}
.error-message {
  color: red;
}
.ivu-modal-footer {
  text-align: left;
}
</style>
