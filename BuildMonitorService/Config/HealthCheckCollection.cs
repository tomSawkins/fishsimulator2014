using System;
using System.Configuration;

namespace BuildMonitorService.Config
{
	public class HealthCheckCollection : ConfigurationElementCollection
	{
		protected override ConfigurationElement CreateNewElement()
		{
			return new HealthCheck();
		}

		protected override object GetElementKey(ConfigurationElement element)
		{
			return ((HealthCheck)element).Id;
		}

		protected override string ElementName
		{
			get
			{
				return "healthcheck";
			}
		}

		protected override bool IsElementName(string elementName)
		{
			return !String.IsNullOrEmpty(elementName) && elementName == "healthcheck";
		}

		public override ConfigurationElementCollectionType CollectionType
		{
			get
			{
				return ConfigurationElementCollectionType.BasicMap;
			}
		}

		public HealthCheck this[int index]
		{
			get
			{
				return base.BaseGet(index) as HealthCheck;
			}
		}

		public new HealthCheck this[string key]
		{
			get
			{
				return base.BaseGet(key) as HealthCheck;
			}
		}
	}
}