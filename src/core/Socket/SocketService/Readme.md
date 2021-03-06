프로젝트의 구조

# Project

```json
{
  "flowState": {
    "elements": [
      {
        "data": {
          "category": "Layer",
          "config": {},
          "label": "Input_node_rz",
          "type": "Input"
        },
        "id": "node_415fc5d748874c669d658f1c1436e1df",
        "position": {
          "x": -80.08588557128992,
          "y": -16.66807930068063
        },
        "type": "Layer"
      },
      {
        "data": {
          "category": "Layer",
          "config": {},
          "label": "Dense_node_LC",
          "type": "Dense"
        },
        "id": "node_a49afab86cad4089ab0c13006653f8bf",
        "position": {
          "x": 148.421875,
          "y": 197
        },
        "type": "Layer"
      }
    ]
  },
  "output": "string"
}

```

#Project Config 구조
```json
{"batch_size":32,
  "early_stop":{
    "monitor":"loss",
    "patience":2,
    "usage":true
  },
  "learning_rate_reduction":{
    "factor":0.25,
    "min_lr":3e-7,
    "monitor":"val_accuracy",
    "patience":2,"usage":true
  },
  "epochs":3242,
  "learning_rate":0.004,
  "loss":"sparse_categorical_crossentropy",
  "metrics":["accuracy"],
  "optimizer":"adam"
}
```

## Entity

- IProjectContent

```json
{
  "flowState": {
    "elements": [
      {
        "data": {
          "category": "Layer",
          "config": {},
          "label": "Input_node_rz",
          "type": "Input"
        },
        "id": "node_415fc5d748874c669d658f1c1436e1df",
        "position": {
          "x": -80.08588557128992,
          "y": -16.66807930068063
        },
        "type": "Layer"
      },
      {
        "data": {
          "category": "Layer",
          "config": {},
          "label": "Dense_node_LC",
          "type": "Dense"
        },
        "id": "node_a49afab86cad4089ab0c13006653f8bf",
        "position": {
          "x": 148.421875,
          "y": 197
        },
        "type": "Layer"
      }
    ]
  },
  "output": "string"
}
```

여기서 elements는 Element[] 입니다.

- Element

```json
{
  "id": "id-1232131",
  "data": {
    "config": {
    },
    "label": "inputNode-91"
  },
  "position": {
    "x": 100,
    "y": 100
  }
}
```

---

#### 'create_block Event 을때 서버에서 처리해야할 것'

dto : BlockCreateDto 라고 할 때, dto.block을 flowState.elements에 insert하면 됩니다.

Example

```typescript
import { BlockCreateDto } from "./block.create.dto";
import { IProjectContent } from "./types";

dto : BlockCreateDto = new BlockCreateDto();
content : IProjetContent = new IProjectContent();
content.flowState.elements.push(dto.block);
```

---

#### 'move_block Event 을때 서버에서 처리해야할 것'

dto: BlockMoveDto라고 할때, flowState.elements에서 각 id와 dto.blockId를 비교해서 일치하는 block에 dto.position을 덮어 씌우면 됩니다.

Example

```typescript
import { BlockMoveDto } from "./block.move.dto";
import { IProjectContent } from "./types";

dto : BlockMoveDto = new BlockMoveDto();
content : IProjectContent = new IProjectContent();

content.flowState.elements = content.flowState.elements.map((element) => {
  if (element.id != dto.blockId) return element;
  const newElement = new Element(element);
  element.position = dto.position;
  return newElement;
})
```

---

#### 'change_block_config Event 을때 서버에서 처리해야할 것'

dto: BlockConfigChangeDto라고 할때, dto.blockId와 일치하는 elements의 config를 수정하면됩니다.

Example

```typescript
import { BlockConfigChangeDto } from "./block.config.change.dto";
import { IProjectContent } from "./types";

dto : BlockConfigChangeDto = new BlockConfigChangeDto();
content : IProjectContent = new IProjectContent();

content.flowState.elements = content.flowState.elements.map((element) => {
  if (element.id != dto.blockId) return element;
  const {
    value,
    name
  } = dto.config;
  element.data.config[name] = value;
  return element;
})
```

---

#### 'change_block_label Event 을때 서버에서 처리해야할 것'

dto: BlockLabelChangeDto라고 할때, dto.blockId와 일치하는 elements의 label수정하면됩니다.

Example

```typescript
import { IProjectContent } from "./types";
import { BlockLabelChangeDto } from "./block.label.change.dto";

dto : BlockLabelChangeDto = new BlockLabelChangeDto();
content : IProjectContent = new IProjectContent();

content.flowState.elements = content.flowState.elements.map((element) => {
  if (element.id != dto.blockId) return element;
  const label = dto.data;
  element.data.label = label;
  return element;
})
```

---
dto: BlockMoveDto라고 할때, flowState.elements에서 각 id와 dto.blockId를 비교해서 일치하는 block에 dto.position을 덮어 씌우면 됩니다.

Example

```typescript
import { BlockMoveDto } from "./block.move.dto";
import { IProjectContent } from "./types";

dto : BlockMoveDto = new BlockMoveDto();
content : IProjectContent = new IProjectContent();

content.flowState.elements = content.flowState.elements.map((element) => {
  if (element.id != dto.blockId) return element;
  const newElement = new Element(element);
  element.position = dto.position;
  return newElement;
})
```

---

#### 'remove_block Event 을때 서버에서 처리해야할 것 (수정)'

dto: BlockRemoveDto라고 할때, flowState.elements에서 dto.blockId와 일치하는 element를 제거,
element가 edge일 경우 
element.target === dto.blockId || element.source === dto.blockId
일 경우도 제거

왜냐하면 블록을 삭제할때 연결된 엣지도 삭제해야하기 때문

Example

```typescript
import {BlockRemoveDto} from "./block.remove.dto";
import {IProjectContent} from "./types";
import {isEdge} from "react-flow-nns";

dto : BlockRemoveDto = new BlockRemoveDto();
content : IProjectContent = new IProjectContent();

function isEdge(element){
    if(element.source !== undefined && element.target  !== undefined){
        return true;
    }
    return false;
}

content.flowState.elements = content.flowState.elements.filter((element) => {
    if(isEdge(element)){
        return element.source != dto.blockId && element.target != dto.blockId;
    }
    return element.id != dto.blockId
})
```

---

#### 'create_edge Event 을때 서버에서 처리해야할 것'

dto: EdgeUpdateDto라고 할때, flowState.elements에 dto.elements를 덮어 씌우시면 됩니다.

Example

```typescript
import { EdgeCreateDto } from "./edge.create.dto";
import { IProjectContent } from "./types";

dto : EdgeCreateDto = new EdgeCreateDto();
content : IProjectContent = new IProjectContent();
content.flowState.elements = dto.elements;
````

---

#### 'update_edge Event 을때 서버에서 처리해야할 것'

dto: EdgeUpdateDto라고 할때, flowState.elements에 dto.elements를 덮어 씌우시면 됩니다.

Example

```typescript
import { IProjectContent } from "./types";
import { EdgeUpdateDto } from "./edge.update.dto";

dto :EdgeUpdateDto = new EdgeUpdateDto();
content : IProjectContent = new IProjectContent();
content.flowState.elements = dto.elements;
```

---

#### 'remove_edge Event 을때 서버에서 처리해야할 것'

dto: EdgeRemoteDto라고 할때, flowState.elements에서 각 id와 dto.blockId를 비교해서 일치하는 element삭제하시면 됩니다.

Example

```typescript
import { EdgeRemoveDto } from "./edge.remove.dto";
import { IProjectContent } from "./types";

dto : EdgeRemoveDto = new EdgeRemoveDto();
content : IProjectContent = new IProjectContent();

content.flowState.elements = content.flowState.elements.filter((element) => {
  return element.id != dto.blockId
})
````

# ProjectConfig (추가)

#### 'change_project_config Event'

```typescript
import {ProjectConfigChangeDto} from "./project.config.change.dto";

dto: ProjectConfigChangeDto = new ProjectConfigChangeDto();
projectConfig : IProjectConfig = new IProjectConfig();

const {name, value} = dto;
projectConfig[name] = value;
```
#### 'change_project_early_stop_config Event'

```typescript

import {ProjectEarlyStopConfigChangeDto} from "./project.earlystopconfig.change.dto";

dto: ProjectEarlyStopConfigChangeDto = new ProjectEarlyStopConfigChangeDto();
projectConfig : IProjectConfig = new IProjectConfig();

const {name, value} = dto;
projectConfig.early_stop[name] = value;
```
#### 'change_project_learning_rate_reduction_config'

```typescript
import {ProjectLearningRateReductionChangeDto} from "./project.learningratereduction.change.dto";

dto: ProjectLearningRateReductionChangeDto = new ProjectLearningRateReductionChangeDto();
projectConfig : IProjectConfig = new IProjectConfig();

const {name, value} = dto;
projectConfig.learning_rate_reduction[name] = value;

```
