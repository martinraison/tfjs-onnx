import * as tf from '@tensorflow/tfjs';
import {Layer} from '@tensorflow/tfjs-layers/dist/engine/topology';
import {SoftmaxLayerConfig} from '@tensorflow/tfjs-layers/dist/layers/advanced_activations';
import {onnx} from 'onnx-proto';

import {OnnxNode} from '../node';
import {getNamedAttrs, parseAttrOrDefault} from '../util';

export interface SoftmaxNodeConfig {
  axis?: onnx.AttributeProto;
}

export class Softmax extends OnnxNode {
  getTfjsLayerConfig(node: onnx.INodeProto): SoftmaxLayerConfig {
    const conf = getNamedAttrs(node.attribute) as SoftmaxNodeConfig;
    const axis = parseAttrOrDefault(conf.axis, 0) as number;
    return {
      axis: axis
    }
  }

  getTfjsLayer(node: onnx.INodeProto): Layer {
    const conf = this.getTfjsConfig(node) as SoftmaxLayerConfig;
    return tf.layers.softmax(conf)
  }
}