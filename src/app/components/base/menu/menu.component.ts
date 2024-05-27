import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { GroupBean } from 'src/app/core/model/groupBean';
import { ScreenBean } from 'src/app/core/model/screenBean';
import { Router} from '@angular/router';
import { MenuBean } from 'src/app/core/model/menuBean';
import {FoodNode} from 'src/app/core/model/foodNode';



/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */


// const TREE_DATA: FoodNode[] = [
//   {
//     name: 'Fruit',
//     children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
//   },
//   {
//     name: 'Vegetables',
//     children: [
//       {
//         name: 'Green',
//         children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
//       },
//       {
//         name: 'Orange',
//         children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
//       },
//     ],
//   },
// ];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: String;

  level: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

  @Input() foodNode:FoodNode[] | any;
  @Input() sidevarChange:any;
  @Input() component:any;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(public router: Router) {
    // this.dataSource.data = TREE_DATA;
  }

  sidevarClose(){
    this.sidevarChange(this.component);
  }

  // createMenu(menu_data: FoodNode[]){
  //   this.menuBean.forEach((value:MenuBean) =>{
  //     let name = value.grupo.keyGroup + '|' + value.grupo.ruta
  //     let children:FoodNode[];
  //     value.children.forEach((value2:MenuBean)=>{
  //       let name = value2.grupo.keyGroup + '|' + value.grupo.ruta;

  //     })

  //     let aux: FoodNode ={
  //       name: name
  //     }


  //     menu_data.push(aux);
  //     this.createMenu(aux);

  //   })

  // }

  ngOnInit() {
     
    // let menu_data: FoodNode[] = [];
  //   this.menu.forEach((value, key) => {
  //     let children: FoodNode[] = [];
  //     value.forEach(element =>{
  //        

  //       var name = element.keyScreen + '|' + key.split('|')[1]
  //       if(name === key){
  //         return;
  //       }
  //       let foodNode: FoodNode = {
  //         name: name + element.rute,
  //       };
  //       children.push(foodNode);
  //     });
  //     let foodNode: FoodNode = {
  //       name: key,
  //       children:children
  //     };
  //     menu_data.push(foodNode);
  //   });

  // // menu_data.forEach((element => {
  // //   // element.children = TREE_DATA;
  // // }))

    this.dataSource.data = this.foodNode;
    this.treeControl.expandAll();
  }

  move(name: string) {
          // console.log(this.router);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
