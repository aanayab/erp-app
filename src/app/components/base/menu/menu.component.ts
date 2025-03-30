import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { GroupBean } from 'src/app/core/model/groupBean';
import { ScreenBean } from 'src/app/core/model/screenBean';
import { Router} from '@angular/router';
import { MenuBean } from 'src/app/core/model/menuBean';
import {FoodNode} from 'src/app/core/model/foodNode';




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
  }

  sidevarClose(){
    this.sidevarChange(this.component);
  }


  ngOnInit() {
     

    this.dataSource.data = this.foodNode;
    this.treeControl.expandAll();
  }


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
