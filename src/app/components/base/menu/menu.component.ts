import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { GroupBean } from 'src/app/core/model/groupBean';
import { ScreenBean } from 'src/app/core/model/screenBean';
import { Router} from '@angular/router';


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;

  level: number;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

  @Input() menu: Map<GroupBean, ScreenBean[]> = new Map();
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

  constructor(private router: Router) {
    // this.dataSource.data = TREE_DATA;
  }

  sidevarClose(){
    this.sidevarChange(this.component);
  }

  ngOnInit() {
    let menu_data: FoodNode[] = [];
    this.menu.forEach((value, key) => {
      value.forEach(element =>{
        console.log(element);
      });
      let foodNode: FoodNode = {
        name: key.keyGroup + '|' + key.ruta,
      };
      menu_data.push(foodNode);
      console.log(value, key);
    });

  menu_data.forEach((element => {
    element.children = TREE_DATA;
  }))

    this.dataSource.data = menu_data;
  }

  move(name: string) {
          console.log(this.router);
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
