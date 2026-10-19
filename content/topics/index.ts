import type { ComponentType } from 'react';

import GitAndVersionControl from './git-and-version-control.mdx';
import CommandLineAndLinux from './command-line-and-linux.mdx';
import DebuggingWorkflow from './debugging-workflow.mdx';
import DataStructuresAndComplexity from './data-structures-and-complexity.mdx';
import LanguageRuntimeBasics from './language-runtime-basics.mdx';
import DependencyManagement from './dependency-management.mdx';

import HttpFundamentals from './http-fundamentals.mdx';
import RestApiDesign from './rest-api-design.mdx';
import DataFormats from './data-formats.mdx';
import BuildARestApi from './build-a-rest-api.mdx';
import Authentication from './authentication.mdx';
import NetworkingBasics from './networking-basics.mdx';

import CreationalPatterns from './creational-patterns.mdx';
import StructuralPatterns from './structural-patterns.mdx';
import BehavioralPatterns from './behavioral-patterns.mdx';
import SolidPrinciples from './solid-principles.mdx';
import MiddlewarePattern from './middleware-pattern.mdx';
import HeadFirstDesignPatterns from './head-first-design-patterns.mdx';

import SqlVsNosql from './sql-vs-nosql.mdx';
import IndexingAndQueries from './indexing-and-queries.mdx';
import DataModeling from './data-modeling.mdx';
import CachingWithRedis from './caching-with-redis.mdx';
import TransactionsAndAcid from './transactions-and-acid.mdx';
import DesignASchema from './design-a-schema.mdx';

import ScalingStrategies from './scaling-strategies.mdx';
import LoadBalancing from './load-balancing.mdx';
import MessageQueues from './message-queues.mdx';
import FaultTolerance from './fault-tolerance.mdx';
import RateLimiting from './rate-limiting.mdx';
import CapTheorem from './cap-theorem.mdx';

import MonolithVsMicroservices from './monolith-vs-microservices.mdx';
import EventDrivenArchitecture from './event-driven-architecture.mdx';
import ApiGateway from './api-gateway.mdx';
import GraphqlAndGrpc from './graphql-and-grpc.mdx';
import DesignAUrlShortener from './design-a-url-shortener.mdx';
import DesignAChatSystem from './design-a-chat-system.mdx';

import Observability from './observability.mdx';
import CiCdAndDeployment from './ci-cd-and-deployment.mdx';
import ContainersAndK8s from './containers-and-k8s.mdx';
import ApiDocumentation from './api-documentation.mdx';
import DatabaseMigrations from './database-migrations.mdx';
import DdiaBook from './ddia-book.mdx';

export const TOPIC_CONTENT: Record<string, ComponentType> = {
  'git-and-version-control': GitAndVersionControl,
  'command-line-and-linux': CommandLineAndLinux,
  'debugging-workflow': DebuggingWorkflow,
  'data-structures-and-complexity': DataStructuresAndComplexity,
  'language-runtime-basics': LanguageRuntimeBasics,
  'dependency-management': DependencyManagement,

  'http-fundamentals': HttpFundamentals,
  'rest-api-design': RestApiDesign,
  'data-formats': DataFormats,
  'build-a-rest-api': BuildARestApi,
  authentication: Authentication,
  'networking-basics': NetworkingBasics,

  'creational-patterns': CreationalPatterns,
  'structural-patterns': StructuralPatterns,
  'behavioral-patterns': BehavioralPatterns,
  'solid-principles': SolidPrinciples,
  'middleware-pattern': MiddlewarePattern,
  'head-first-design-patterns': HeadFirstDesignPatterns,

  'sql-vs-nosql': SqlVsNosql,
  'indexing-and-queries': IndexingAndQueries,
  'data-modeling': DataModeling,
  'caching-with-redis': CachingWithRedis,
  'transactions-and-acid': TransactionsAndAcid,
  'design-a-schema': DesignASchema,

  'scaling-strategies': ScalingStrategies,
  'load-balancing': LoadBalancing,
  'message-queues': MessageQueues,
  'fault-tolerance': FaultTolerance,
  'rate-limiting': RateLimiting,
  'cap-theorem': CapTheorem,

  'monolith-vs-microservices': MonolithVsMicroservices,
  'event-driven-architecture': EventDrivenArchitecture,
  'api-gateway': ApiGateway,
  'graphql-and-grpc': GraphqlAndGrpc,
  'design-a-url-shortener': DesignAUrlShortener,
  'design-a-chat-system': DesignAChatSystem,

  observability: Observability,
  'ci-cd-and-deployment': CiCdAndDeployment,
  'containers-and-k8s': ContainersAndK8s,
  'api-documentation': ApiDocumentation,
  'database-migrations': DatabaseMigrations,
  'ddia-book': DdiaBook,
};
