<template>
  <Submenu :name="`${parentName}`" class="super-title-hover-style">
    <template slot="title">
      <common-icon :type="parentItem.icon || ''"/>
      <span>{{ showTitle(parentItem) }}</span>
    </template>

      <template v-for="item in children">
        <template v-if="item.children && item.children.length === 1">
          <div class="www">
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`"><common-icon :type="item.children[0].icon || ''"/><span>{{ showTitle(item.children[0]) }}</span></menu-item>
          </div>
        </template>
        <template v-else>
          <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
          <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
        </template>
      </template>

  </Submenu>
</template>
<script>
import mixin from './mixin'
import itemMixin from './item-mixin'
export default {
  name: 'SideMenuItem',
  mixins: [ mixin, itemMixin ]
}
</script>
<style>
      .super-title-hover-style .ivu-menu-submenu-title:hover{
        background-color: rgba(0,0,0,0);
      }
      .super-title-hover-style .ivu-menu .ivu-menu-item-active span{
        color: #ffffff !important;
      }
      .super-title-hover-style .ivu-menu .ivu-menu-item-active{
         background-color: #17233d !important;
      }
      .super-title-hover-style .ivu-menu .ivu-menu-item-active:hover span{
              color: #ffffff !important;
      }
      .super-title-hover-style .ivu-menu .ivu-menu-item:hover span{
               color: #2d8cf0;
      }
      .super-title-hover-style .ivu-menu .ivu-menu-item{
        color: #323232 !important;
      }
      .super-title-hover-style .ivu-menu-submenu-title:hover i{
           color: #2d8cf0 !important;
      }
      .super-title-hover-style .ivu-menu-submenu-title{
           /*pointer-events: none;*/
      }
      .super-menu-style .ivu-menu-item{
        color: #323232 !important;
      }
      .super-title-hover-style .ivu-menu-submenu-title:hover span{
           color: #2d8cf0 !important;
      }
      .super-title-hover-style .ivu-menu-submenu-title{
        color: #323232 !important;
      }
      .super-menu-style .ivu-menu-item-selected{
        color: #2d8cf0 !important;
      }
</style>
