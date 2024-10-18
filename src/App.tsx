import type { GraphOptions } from '@antv/g6';
import { Graph as G6Graph } from '@antv/g6';
import { useEffect, useRef } from 'react';

const dataString = `{
    "nodes":
    [
        {
            "id": "C|vikram_1",
            "type": "circle",
            "style":
            {
                "labelText": "Customer"
            },
            "data":
            {
                "PARTY_KEY": "vikram_1",
                "PEP_FLAG": false,
                "KYC_MAILING_ADDRESS": "Address 1",
                "RISK_LEVEL": "1",
                "INDIVIDUAL_CORPORATE_TYPE": "I",
                "CITIZENSHIP_COUNTRY": "SG",
                "PARTY_NAME": "Vikram 1",
                "GENDER": "male",
                "RESIDENCE_OPERATION_COUNTRY": "MY",
                "has_alert": 1,
                "label": "CUSTOMER"
            },
            "combo": "CUSTOMER|vikram_1",
            "nodeCount": 1
        },
        {
            "id": "C|vikram_2",
            "type": "circle",
            "style":
            {
                "labelText": "Customer"
            },
            "data":
            {
                "PARTY_KEY": "vikram_2",
                "PEP_FLAG": false,
                "KYC_MAILING_ADDRESS": "Address 1",
                "RISK_LEVEL": "1",
                "INDIVIDUAL_CORPORATE_TYPE": "I",
                "CITIZENSHIP_COUNTRY": "SG",
                "PARTY_NAME": "Vikram 2",
                "GENDER": "male",
                "RESIDENCE_OPERATION_COUNTRY": "MY",
                "has_alert": 1,
                "label": "CUSTOMER"
            },
            "combo": "CUSTOMER|vikram_2",
            "nodeCount": 1
        },
        {
            "id": "A|account_1",
            "type": "circle",
            "style":
            {
                "labelText": "ACCOUNT"
            },
            "data":
            {
                "KNOWN_ACCOUNT": true,
                "ACCOUNT_KEY": "account_1",
                "ACCOUNT_NAME": "Account 1",
                "ACCOUNT_TYPE": "SAVINGS",
                "RISK_LEVEL": "0",
                "CURRENCY_CODE": "SGD",
                "ACCOUNT_NUMBER": "1",
                "has_alert": null,
                "label": "ACCOUNT"
            },
            "combo": "CUSTOMER|vikram_1",
            "nodeCount": 2
        },
        {
            "id": "A|account_1_dormant",
            "type": "circle",
            "style":
            {
                "labelText": "ACCOUNT"
            },
            "data":
            {
                "KNOWN_ACCOUNT": true,
                "ACCOUNT_KEY": "account_1_dormant",
                "ACCOUNT_NAME": "Account 1",
                "ACCOUNT_TYPE": "SAVINGS",
                "RISK_LEVEL": "0",
                "CURRENCY_CODE": "SGD",
                "ACCOUNT_NUMBER": "1",
                "has_alert": null,
                "label": "ACCOUNT"
            },
            "combo": "CUSTOMER|vikram_1",
            "nodeCount": 3
        }
    ],
    "edges":
    [
        {
            "id": "4r5-SC|vikram_1-31ud-SA|account_1",
            "source": "C|vikram_1",
            "target": "A|account_1",
            "label": "HAS_ACCOUNT",
            "data":
            {
                "TT_CREATED_TIME": "2024-03-01T10:49:43.209Z",
                "TT_IS_DELETED": false,
                "RELATIONSHIP_START_DATE": "2022-05-29T14:53:43.188Z",
                "RELATION_CODE": "PI",
                "TT_UPDATED_TIME": "2024-03-01T10:49:43.209Z",
                "RELATIONSHIP_END_DATE": "2030-05-19T07:22:21.017Z"
            }
        },
        {
            "id": "55d-SC|vikram_1-31ud-SA|account_1_dormant",
            "source": "C|vikram_1",
            "target": "A|account_1_dormant",
            "label": "HAS_ACCOUNT",
            "data":
            {
                "RELATIONSHIP_START_DATE": "2022-05-29T14:53:43.188Z",
                "RELATION_CODE": "PI",
                "RELATIONSHIP_END_DATE": "2030-05-19T07:22:21.017Z",
                "TT_IS_DELETED": false,
                "TT_UPDATED_TIME": "2024-03-01T10:49:43.209Z",
                "TT_CREATED_TIME": "2024-03-01T10:49:43.209Z"
            }
        }
    ],
    "combos":
    [
        {
            "id": "CUSTOMER|vikram_1",
            "data":
            {
                "PARTY_KEY": "vikram_1",
                "PEP_FLAG": false,
                "KYC_MAILING_ADDRESS": "Address 1",
                "RISK_LEVEL": "1",
                "INDIVIDUAL_CORPORATE_TYPE": "I",
                "CITIZENSHIP_COUNTRY": "SG",
                "PARTY_NAME": "Vikram 1",
                "GENDER": "male",
                "RESIDENCE_OPERATION_COUNTRY": "MY",
                "has_alert": 1,
                "label": "CUSTOMER"
            },
            "style":
            {
                "collapsed": false
            },
            "nodeCount": 3
        },
        {
            "id": "CUSTOMER|vikram_2",
            "data":
            {
                "PARTY_KEY": "vikram_2",
                "PEP_FLAG": false,
                "KYC_MAILING_ADDRESS": "Address 1",
                "RISK_LEVEL": "1",
                "INDIVIDUAL_CORPORATE_TYPE": "I",
                "CITIZENSHIP_COUNTRY": "SG",
                "PARTY_NAME": "Vikram 2",
                "GENDER": "male",
                "RESIDENCE_OPERATION_COUNTRY": "MY",
                "has_alert": 1,
                "label": "CUSTOMER"
            },
            "style":
            {
                "collapsed": false
            },
            "nodeCount": 2
        }
    ]
}`;

export interface GraphProps {
  options: GraphOptions
  onRender?: (graph: G6Graph) => void;
  onDestroy?: () => void;
}

export const GraphReact = (props: GraphProps) => {
  const { options, onRender, onDestroy } = props;
  const graphRef = useRef<G6Graph>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const graph = new G6Graph({ container: containerRef.current! });
    graphRef.current = graph;

    return () => {
      const graph = graphRef.current;
      if (graph) {
        graph.destroy();
        onDestroy?.();
        graphRef.current = undefined;
      }
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const graph = graphRef.current;

    if (!options || !container || !graph || graph.destroyed) return;

    graph.setOptions(options);
    graph
      .render()
      .then(() => onRender?.(graph))
      // eslint-disable-next-line no-console
      .catch((error) => console.debug(error));
  }, [options]);

  return <div className="App" ref={containerRef} />;
};

export const GraphBase = () => {
  // read data from json file and render the graph
  const data = JSON.parse(dataString)

  console.log("data", data)
  const graphOptions: GraphProps = {
    options: {
      container: 'root',
      width: 800,
      height: 600,
      data: data,
      layout: { type: "combo-combined" },
      behaviors: [
        "drag-canvas",
        "zoom-canvas",
        "drag-element",
        "click-select",
        "collapse-expand",
      ]
    },
  }
  return <GraphReact options={graphOptions.options} />
}

export default GraphBase
